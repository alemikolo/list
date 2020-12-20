/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import User from '@modules/user/entity';

@ObjectType()
@Entity()
export default class Token extends BaseEntity {
  @Column({ length: 2000, type: 'varchar' })
  token!: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.token, { nullable: true })
  user!: User;
}
