/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import Task from '@modules/task/entity';
import Project from '@modules/project/entity';
import User from '@modules/user/entity';
import Category from '@modules/category/entity';
import Stage from '@modules/stage/entity';
import Label from '@modules/label/entity';
import Organization from '@modules/organization/entity';

@ObjectType()
@Entity()
export default class Lock extends BaseEntity {
  @Field({ nullable: true })
  @Column({ length: 32, nullable: true, type: 'varchar' })
  field!: string;

  @Field(() => Task)
  @ManyToOne(() => Task, task => task.locks, { nullable: true })
  task!: Task;

  @Field(() => Stage)
  @ManyToOne(() => Stage, stage => stage.locks, { nullable: true })
  stage!: Stage;

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.locks, { nullable: true })
  category!: Category;

  @Field(() => Label)
  @ManyToOne(() => Label, label => label.locks, { nullable: true })
  label!: Label;

  @Field(() => Project)
  @ManyToOne(() => Project, project => project.locks, { nullable: true })
  project!: Project;

  @Field(() => User)
  @ManyToOne(() => User, user => user.locks, { nullable: true })
  user!: User;

  @Field(() => Organization)
  @ManyToOne(() => Organization, organization => organization.locks, {
    nullable: true
  })
  organization!: Organization;
}
