/* eslint-disable import/no-cycle */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import Activity from '@modules/activity/entity';
import Item from '@modules/item/entity';
import Lock from '@modules/lock/entity';
import User from '@modules/user/entity';
import { Status, Type } from '@shared/types';

@ObjectType()
@Entity()
export default class List extends BaseEntity {
  @Field()
  @Column({ length: 1000, nullable: true, type: 'varchar' })
  description!: string;

  @Field()
  @Column({ length: 50, nullable: false, type: 'varchar' })
  name!: string;

  @Field(() => Type)
  @Column({
    default: Type.BASIC,
    enum: Type,
    nullable: false,
    type: 'enum'
  })
  type!: Type;

  @Field(() => Status)
  @Column({
    default: Status.ACTIVE,
    enum: Status,
    nullable: false,
    type: 'enum'
  })
  status!: Status;

  @Field(() => User)
  @ManyToMany(() => User, user => user.favorites)
  isFavorite!: User[];

  @Field(() => Item)
  @OneToMany(() => Item, item => item.list)
  items!: Item[];

  @Field(() => Activity)
  @OneToMany(() => Activity, activity => activity.list)
  change!: Activity[];

  @Field(() => Lock)
  @OneToMany(() => Lock, lock => lock.list)
  locks!: Lock[];

  @Field(() => User)
  @ManyToOne(() => User, user => user.listsCreator, { nullable: false })
  creator!: User;

  @Field(() => User)
  @ManyToOne(() => User, user => user.listsModifier, { nullable: false })
  modifier!: User;

  @Field(() => List)
  @ManyToMany(() => List, list => list.complexLists)
  @JoinTable()
  lists!: List[];

  @Field(() => List)
  @ManyToMany(() => List, list => list.lists)
  complexLists!: List[];

  @Field(() => User)
  @ManyToMany(() => User, user => user.owner)
  owners!: User[];

  @Field(() => User)
  @ManyToMany(() => User, user => user.editor)
  editors!: User[];

  @Field(() => User)
  @ManyToMany(() => User, user => user.viewer)
  viewers!: User[];
}
