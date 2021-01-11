/* eslint-disable import/no-cycle */
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { ObjectType } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import User from '@modules/user/entity';
import { TokenType } from '@shared/enums';

@ObjectType()
@Entity()
@Index(['id', 'token', 'type', 'user'], { unique: true })
export default class Token extends BaseEntity {
  @Column({ length: 2000, type: 'varchar' })
  token!: string;

  @Column({
    enum: TokenType,
    nullable: false,
    type: 'enum'
  })
  type!: TokenType;

  @ManyToOne(() => User, user => user.token, { eager: true, nullable: true })
  user!: User;
}
