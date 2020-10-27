/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import Activity from '@modules/activity/entity';
import Project from '@modules/project/entity';
import Lock from '@modules/lock/entity';
import User from '@modules/user/entity';
import { Status } from '@shared/enums';

@ObjectType()
@Entity()
export default class Organization extends BaseEntity {
  @Field({ nullable: true })
  @Column({ length: 256, nullable: true, type: 'varchar' })
  avatarUrl!: string;

  @Field({ nullable: true })
  @Column({ length: 1000, nullable: true, type: 'varchar' })
  description!: string;

  @Field()
  @Column({ length: 50, nullable: false, type: 'varchar' })
  name!: string;

  @Field(() => Status)
  @Column({
    default: Status.ACTIVE,
    enum: Status,
    nullable: false,
    type: 'enum'
  })
  status!: Status;

  @Field(() => Activity)
  @OneToMany(() => Activity, activity => activity.organization)
  change!: Activity[];

  @Field(() => Lock)
  @OneToMany(() => Lock, lock => lock.organization)
  locks!: Lock[];

  @Field(() => User)
  @ManyToOne(() => User, user => user.orgCreator, { nullable: false })
  creator!: User;

  @Field(() => User)
  @ManyToOne(() => User, user => user.orgModifier, { nullable: false })
  modifier!: User;

  @Field(() => Project)
  @OneToMany(() => Project, project => project.organization)
  projects!: Project[];

  @Field(() => User)
  @ManyToMany(() => User, user => user.organizationOwner)
  owners!: User[];

  @Field(() => User)
  @ManyToMany(() => User, user => user.organizationAdmin)
  admins!: User[];

  @Field(() => User)
  @ManyToMany(() => User, user => user.organizationMember)
  members!: User[];

  @Field(() => User)
  @ManyToMany(() => User, user => user.organizationViewer)
  viewers!: User[];
}
