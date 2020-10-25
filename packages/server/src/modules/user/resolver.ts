import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { getManager } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import { connectDB, disconnectDB } from '@db/db';
import { AccountStatus } from '@shared/enums';
import { Context } from '@shared/types';
import {
  isAuth,
  createAccessToken,
  createRefreshToken,
  sendRefreshToken
} from './auth';
import User from './entity';

@ObjectType()
class SignInResponse {
  @Field()
  accessToken!: string;
  @Field(() => User)
  user!: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi!';
  }

  @UseMiddleware(isAuth)
  @Query(() => String)
  bye(@Ctx() { user }: Context) {
    return `Your user id is ${user?.userId}.`;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { user }: Context) {
    try {
      if (!user) {
        throw new Error();
      }

      const { userId } = user;

      await connectDB();

      const currentUser = await User.findOne(userId);

      await disconnectDB();

      return currentUser;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<Boolean> {
    try {
      await connectDB();

      await getManager().increment(User, { email }, 'tokenVersion', 1);

      await disconnectDB();

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
    await connectDB();

    const user = await User.findOne({ where: { email } });

    await disconnectDB();

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
      await connectDB();

      const hashedPassword = await hash(password, 12);

      await User.insert({
        email,
        password: hashedPassword,
        status: AccountStatus.REGISTERED
      });

      await disconnectDB();
    } catch (error) {
      console.error(error);

      return false;
    }

    return true;
  }
}
