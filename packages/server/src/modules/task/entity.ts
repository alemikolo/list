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
import Category from '@modules/category/entity';
import Project from '@modules/project/entity';
import Lock from '@modules/lock/entity';
import Label from '@modules/label/entity';
import Stage from '@modules/stage/entity';
import User from '@modules/user/entity';
import { Priority, Status } from '@shared/enums';

@ObjectType()
@Entity()
export default class Task extends BaseEntity {
  @Field({ nullable: true })
  @Column({ length: 1000, nullable: true, type: 'varchar' })
  description!: string;

  @Field()
  @Column({
    default: false,
    nullable: false
  })
  done!: boolean;

  @Field()
  @Column({ length: 50, nullable: false, type: 'varchar' })
  name!: string;

  @Field(() => Priority)
  @Column({
    default: Priority.Normal,
    enum: Priority,
    nullable: false,
    type: 'enum'
  })
  priority!: Priority;

  @Field(() => Status)
  @Column({
    default: Status.Active,
    enum: Status,
    nullable: false,
    type: 'enum'
  })
  status!: Status;

  @Field(() => Activity)
  @OneToMany(() => Activity, activity => activity.task)
  change!: Activity[];

  @Field(() => Lock)
  @OneToMany(() => Lock, lock => lock.task)
  locks!: Lock[];

  @Field(() => Stage)
  @OneToMany(() => Stage, stage => stage.task)
  stage!: Stage;

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.tasks, { nullable: true })
  category!: Category;

  @Field(() => User)
  @ManyToOne(() => User, user => user.taskCreator, { nullable: false })
  creator!: User;

  @Field(() => User)
  @ManyToOne(() => User, user => user.taskPerformer, { nullable: true })
  performer!: User;

  @Field(() => User)
  @ManyToOne(() => User, user => user.taskModifier, { nullable: false })
  modifier!: User;

  @Field(() => Project)
  @ManyToOne(() => Project, project => project.tasks, { nullable: false })
  project!: Project;

  @Field(() => Label)
  @JoinTable()
  @ManyToMany(() => Label, label => label.tasks)
  labels!: Label[];
}
