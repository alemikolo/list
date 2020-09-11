import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { hash } from 'bcryptjs';

import { connectDB, disconnectDB } from '@db/db';
import User from './entity';
import { AccountStatus } from '@shared/types';

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi!';
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
