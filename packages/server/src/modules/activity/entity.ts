/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import Category from '@modules/category/entity';
import Task from '@modules/task/entity';
import Project from '@modules/project/entity';
import Settings from '@modules/settings/entity';
import User from '@modules/user/entity';

@ObjectType()
@Entity()
export default class Activity extends BaseEntity {
  @Field()
  @Column({ length: 32, nullable: true, type: 'varchar' })
  field!: string;

  @Field()
  @Column({ length: 256, type: 'varchar' })
  messageId!: string;

  @Field()
  @Column({ length: 1000, nullable: true, type: 'varchar' })
  newValue!: string;

  @Field()
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

  @Field(() => Project)
  @ManyToOne(() => Project, project => project.change, { nullable: true })
  project!: Project;

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
