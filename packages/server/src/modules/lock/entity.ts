/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import Task from '@modules/task/entity';
import Project from '@modules/project/entity';
import User from '@modules/user/entity';

@ObjectType()
@Entity()
export default class Lock extends BaseEntity {
  @Field()
  @Column({ length: 32, nullable: true, type: 'varchar' })
  field!: string;

  @Field(() => Task)
  @ManyToOne(() => Task, task => task.locks, { nullable: true })
  task!: Task;

  @Field(() => Project)
  @ManyToOne(() => Project, project => project.locks, { nullable: true })
  project!: Project;

  @Field(() => User)
  @ManyToOne(() => User, user => user.locks, { nullable: true })
  user!: User;
}
