/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import Activity from '@modules/activity/entity';
import Category from '@modules/category/entity';
import List from '@modules/list/entity';
import Lock from '@modules/lock/entity';
import User from '@modules/user/entity';
import { Priority, Status } from '@shared/types';

@ObjectType()
@Entity()
export default class Item extends BaseEntity {
  @Field()
  @Column({ length: 1000, nullable: true, type: 'varchar' })
  description!: string;

  @Field()
  @Column({
    default: false,
    nullable: false
  })
  done!: boolean;

  @Field()
  @Column({ length: 512, nullable: true, type: 'varchar' })
  link!: string;

  @Field()
  @Column({ length: 50, nullable: false, type: 'varchar' })
  name!: string;

  @Field(() => Priority)
  @Column({
    default: Priority.NORMAL,
    enum: Priority,
    nullable: false,
    type: 'enum'
  })
  priority!: Priority;

  @Field(() => Status)
  @Column({
    default: Status.ACTIVE,
    enum: Status,
    nullable: false,
    type: 'enum'
  })
  status!: Status;

  @Field(() => Activity)
  @OneToMany(() => Activity, activity => activity.item)
  change!: Activity[];

  @Field(() => Lock)
  @OneToMany(() => Lock, lock => lock.item)
  locks!: Lock[];

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.items, { nullable: true })
  category!: Category;

  @Field(() => User)
  @ManyToOne(() => User, user => user.itemsCreator, { nullable: false })
  creator!: User;

  @Field(() => User)
  @ManyToOne(() => User, user => user.itemsModifier, { nullable: false })
  modifier!: User;

  @Field(() => List)
  @ManyToOne(() => List, list => list.items, { nullable: false })
  list!: List;
}
