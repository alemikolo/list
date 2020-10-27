/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import Category from '@modules/category/entity';
import Task from '@modules/task/entity';
import Project from '@modules/project/entity';
import Settings from '@modules/settings/entity';
import Stage from '@modules/stage/entity';
import User from '@modules/user/entity';
import Label from '@modules/label/entity';
import Organization from '@modules/organization/entity';

@ObjectType()
@Entity()
export default class Activity extends BaseEntity {
  @Field({ nullable: true })
  @Column({ length: 32, nullable: true, type: 'varchar' })
  field!: string;

  @Field()
  @Column({ length: 256, type: 'varchar' })
  messageId!: string;

  @Field({ nullable: true })
  @Column({ length: 1000, nullable: true, type: 'varchar' })
  newValue!: string;

  @Field({ nullable: true })
  @Column({ length: 1000, nullable: true, type: 'varchar' })
  oldValue!: string;

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.change, {
    nullable: true
  })
  category!: Category;

  @Field(() => Task)
  @ManyToOne(() => Task, task => task.change, { nullable: true })
  task!: Task;

  @Field(() => Label)
  @ManyToOne(() => Label, label => label.change, { nullable: true })
  label!: Label;

  @Field(() => Stage)
  @ManyToOne(() => Stage, stage => stage.change, { nullable: true })
  stage!: Stage;

  @Field(() => Project)
  @ManyToOne(() => Project, project => project.change, { nullable: true })
  project!: Project;

  @Field(() => Organization)
  @ManyToOne(() => Organization, organization => organization.change, {
    nullable: true
  })
  organization!: Organization;

  @Field(() => Settings)
  @ManyToOne(() => Settings, settings => settings.change, {
    nullable: true
  })
  settings!: Settings;

  @Field(() => User)
  @ManyToOne(() => User, user => user.change, { nullable: true })
  user!: User;

  @Field(() => User)
  @ManyToOne(() => User, user => user.activity)
  performer!: User;
}
