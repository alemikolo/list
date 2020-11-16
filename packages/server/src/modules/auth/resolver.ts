import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getManager } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import { AccountStatus } from '@shared/enums';
import { Context } from '@shared/types';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken
} from './auth';
import User from '@modules/user/entity';
import { sendSignUpConfirmation } from '@modules/mailer';

@ObjectType()
class SignInResponse {
  @Field()
  accessToken!: string;
  @Field(() => User)
  user!: User;
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

    const { id, tokenVersion } = user;

    sendRefreshToken(res, createRefreshToken(id, tokenVersion));

    return {
      accessToken: createAccessToken(id),
      user
    };
  }

  @Mutation(() => Boolean)
  async signUp(@Arg('email') email: string, @Arg('password') password: string) {
    try {
      const hashedPassword = await hash(password, 12);

      await User.insert({
        email,
        password: hashedPassword,
        status: AccountStatus.Registered
      });

      await sendSignUpConfirmation({
        recipient: email,
        redirectUrl: 'http://handle-it',
        user: { email }
      });
    } catch (error) {
      console.error(error);

      return false;
    }

    return true;
  }
}
