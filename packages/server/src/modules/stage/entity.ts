/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import Activity from '@modules/activity/entity';
import Lock from '@modules/lock/entity';
import User from '@modules/user/entity';
import Task from '@modules/task/entity';
import Project from '@modules/project/entity';
import { Icon } from '@shared/enums';

@ObjectType()
@Entity()
export default class Stage extends BaseEntity {
  @Field({ nullable: true })
  @Column({ length: 1000, nullable: true, type: 'varchar' })
  description!: string;

  @Field()
  @Column({ length: 50, nullable: false, type: 'varchar' })
  name!: string;

  @Field(() => Icon, { nullable: true })
  @Column({
    enum: Icon,
    nullable: true,
    type: 'enum'
  })
  icon!: Icon;

  @Field()
  @Column({ nullable: false, type: 'integer' })
  order!: number;

  @Field(() => Activity)
  @OneToMany(() => Activity, activity => activity.stage)
  change!: Activity[];

  @Field(() => Lock)
  @OneToMany(() => Lock, lock => lock.stage)
  locks!: Lock[];

  @Field(() => User)
  @ManyToOne(() => User, user => user.stageCreator, { nullable: false })
  creator!: User;

  @Field(() => User)
  @ManyToOne(() => User, user => user.stageModifier, { nullable: false })
  modifier!: User;

  @Field(() => Project)
  @ManyToOne(() => Project, project => project.stage)
  project!: Project;

  @Field(() => Task)
  @ManyToOne(() => Task, task => task.stage)
  task!: Task;
}
