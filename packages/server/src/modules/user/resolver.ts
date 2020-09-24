import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from 'type-graphql';
import { compare, hash } from 'bcryptjs';

import { connectDB, disconnectDB } from '@db/db';
import { AccountStatus, Context } from '@shared/types';
import { signAccessToken, signRefreshToken } from './auth';
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

  @Query(() => [User])
  users() {
    return User.find();
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

    res.cookie('jid', signRefreshToken(user.id), {
      httpOnly: true,
      sameSite: true
    });

    return {
      accessToken: signAccessToken(user.id)
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
