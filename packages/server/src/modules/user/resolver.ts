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
class LoginResponse {
  @Field()
  accessToken!: string;
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
  async logout(@Ctx() { res }: Context) {
    res.clearCookie('refreshToken');

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
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
      accessToken: createAccessToken(id)
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
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
