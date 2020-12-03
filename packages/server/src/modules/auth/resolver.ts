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
      throw new Error('no user');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('bad pass');
    }

    const { id, status, tokenVersion } = user;

    if (status !== AccountStatus.Active) {
      throw new Error('not active account');
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

    const redirectUrl = `${APP_URL}/confirmation/${token}`;

    await sendSignUpConfirmation({
      recipient: email,
      redirectUrl,
      user: { email }
    });

    return true;
  }

  @Mutation(() => Boolean)
  async confirmSignUp(@Arg('token') token: string) {
    const payload = verifyToken(token, {
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

    return true;
  }

  @Mutation(() => Boolean)
  async resendSignUpConfirmation(@Arg('token') token: string) {
    const payload = verifyToken(token, {
      ignoreExpiration: true
    });

    const { userId: id } = payload;

    const user = await User.findOne({ id, status: AccountStatus.Registered });

    if (!user) {
      throw new BadRequestError();
    }

    const { email } = user;

    const newToken = createToken(CONFIRM_SIGN_UP_TOKEN_EXP)(id);

    const redirectUrl = `${APP_URL}/confirmation/${newToken}`;

    await sendSignUpConfirmation({
      recipient: email,
      redirectUrl,
      user: { email }
    });

    return true;
  }
}
