/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import Activity from '@modules/activity/entity';
import User from '@modules/user/entity';
import Task from '@modules/task/entity';
import Lock from '@modules/lock/entity';
import { Icon } from '@shared/enums';

@ObjectType()
@Entity()
export default class Label extends BaseEntity {
  @Field({ nullable: true })
  @Column({ length: 7, nullable: true, type: 'varchar' })
  color!: string;

  @Field({ nullable: true })
  @Column({ length: 1000, nullable: true, type: 'varchar' })
  description!: string;

  @Field(() => Icon, { nullable: true })
  @Column({
    enum: Icon,
    nullable: true,
    type: 'enum'
  })
  icon!: Icon;

  @Field()
  @Column({ length: 50, nullable: false, type: 'varchar' })
  name!: string;

  @Field(() => Activity)
  @OneToMany(() => Activity, activity => activity.label)
  change!: Activity[];

  @Field(() => Lock)
  @OneToMany(() => Lock, lock => lock.label)
  locks!: Lock[];

  @Field(() => Task)
  @ManyToMany(() => Task, task => task.category)
  tasks!: Task[];

  @Field(() => User)
  @ManyToOne(() => User, user => user.categoryCreator, { nullable: false })
  creator!: User;

  @Field(() => User)
  @ManyToOne(() => User, user => user.categoryModifier, { nullable: false })
  modifier!: User;
}
