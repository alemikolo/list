import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getManager } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import { AccountStatus } from '@shared/enums';
import { Context } from '@shared/types';
import {
  createAccessToken,
  createRefreshToken,
  createToken,
  sendRefreshToken,
  verifyToken
} from './auth';
import Token from './entity';
import User from '@modules/user/entity';
import { sendSignUpConfirmation } from '@modules/mailer';
import { BadRequestError, ValidationError } from '@errors/index';
import { ErrorReason } from '@errors/enums';
import environment from '@env/env';

const { APP_URL, CONFIRM_SIGN_UP_TOKEN_EXP } = environment;
@ObjectType()
class SignInResponse {
  @Field(() => User)
  user!: User;
  @Field()
  accessToken!: string;
}

@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<Boolean> {
    try {
      await getManager().increment(User, { email }, 'tokenVersion', 1);

      // send email with link
    } catch (error) {
      console.error(error);

      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async signOut(@Ctx() { res }: Context) {
    res.clearCookie('refreshToken', { path: '/api/auth/refresh-token' });

    return true;
  }

  @Mutation(() => SignInResponse)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ): Promise<SignInResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestError();
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new ValidationError(
        'Invalid credentials',
        ErrorReason.InvalidCredentials
      );
    }

    const { id, status, tokenVersion } = user;

    if (status !== AccountStatus.Active) {
      throw new BadRequestError(
        'Account Not Active',
        ErrorReason.AccountNotConfirmed
      );
    }

    sendRefreshToken(res, createRefreshToken(id, tokenVersion));

    return {
      accessToken: createAccessToken(id),
      user
    };
  }

  @Mutation(() => Boolean)
  async signUp(@Arg('email') email: string, @Arg('password') password: string) {
    const user = await User.findOne({ email });

    if (user) {
      throw new BadRequestError();
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await User.insert({
      email,
      password: hashedPassword,
      status: AccountStatus.Registered
    });

    const { identifiers } = newUser;

    const [{ id }] = identifiers;

    const token = createToken(CONFIRM_SIGN_UP_TOKEN_EXP)(id);

    const {
      identifiers: [{ id: tokenId }]
    } = await Token.insert({ token, user: id });

    const redirectUrl = `${APP_URL}/sign-up-confirmation/${tokenId}`;

    await sendSignUpConfirmation({
      recipient: email,
      redirectUrl,
      user: { email }
    });

    return true;
  }

  @Mutation(() => Boolean)
  async confirmSignUp(@Arg('tokenId') tokenId: string) {
    const token = await Token.findOne({ id: tokenId });

    if (!token) {
      // TODO sign up one more time
      throw new BadRequestError();
    }

    const { token: jwtToken } = token;

    const payload = verifyToken(jwtToken, {
      ignoreExpiration: true
    });

    const { exp, userId: id } = payload;

    if (Date.now() >= exp * 1000) {
      throw new ValidationError('Link has expired', ErrorReason.ExpiredLink);
    }

    await getManager().update(
      User,
      { id, status: AccountStatus.Registered },
      { activeAt: new Date(), status: AccountStatus.Active }
    );

    await Token.delete({ id: tokenId });

    return true;
  }

  @Mutation(() => Boolean)
  async resendSignUpConfirmation(@Arg('tokenId') tokenId: string) {
    const token = await Token.findOne({ id: tokenId });

    if (!token) {
      // TODO sign up one more time
      throw new BadRequestError();
    }

    const { token: jwtToken } = token;

    const payload = verifyToken(jwtToken, {
      ignoreExpiration: true
    });

    const { userId: id } = payload;

    const user = await User.findOne({ id, status: AccountStatus.Registered });

    if (!user) {
      throw new BadRequestError();
    }

    const { email } = user;

    const newToken = createToken(CONFIRM_SIGN_UP_TOKEN_EXP)(id);

    await getManager().update(Token, { id: tokenId }, { token: newToken });

    const redirectUrl = `${APP_URL}/sign-up-confirmation/${tokenId}`;

    await sendSignUpConfirmation({
      recipient: email,
      redirectUrl,
      user: { email }
    });

    return true;
  }
}

//TODO validate userId, email, password, token
