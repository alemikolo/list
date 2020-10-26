/* eslint-disable import/no-cycle */
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import Activity from '@modules/activity/entity';
import Category from '@modules/category/entity';
import Item from '@modules/item/entity';
import Project from '@modules/project/entity';
import Lock from '@modules/lock/entity';
import Settings from '@modules/settings/entity';
import { AccountStatus } from '@shared/enums';

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field({ nullable: true })
  @Column({ nullable: true, type: 'timestamptz' })
  activeAt!: Date;

  @Field({ nullable: true })
  @Column({ length: 256, nullable: true, type: 'varchar' })
  avatarUrl!: string;

  @Field()
  @Column({ length: 100, nullable: false, type: 'varchar', unique: true })
  email!: string;

  @Column({ length: 128, nullable: true, type: 'varchar', unique: true })
  hashedEmail!: string;

  @Field({ nullable: true })
  @Column({ length: 50, nullable: true, type: 'varchar' })
  name!: string;

  @Column({ length: 128, nullable: true, type: 'varchar' })
  password!: string;

  @Column({ length: 50, nullable: true, type: 'varchar' })
  provider!: string;

  @Column({ default: 0, nullable: false, type: 'integer' })
  tokenVersion!: number;

  @Field(() => AccountStatus)
  @Column({
    default: AccountStatus.ACTIVE,
    enum: AccountStatus,
    nullable: false,
    type: 'enum'
  })
  status!: AccountStatus;

  @Field(() => Settings, { nullable: true })
  @OneToOne(() => Settings, {
    nullable: true
  })
  @JoinColumn()
  settings!: Settings;

  @Field(() => Category)
  @OneToMany(() => Category, category => category.creator)
  categoryCreator!: Category[];

  @Field(() => Category)
  @OneToMany(() => Category, category => category.modifier)
  categoryModifier!: Category[];

  @Field(() => Item)
  @OneToMany(() => Item, item => item.creator)
  itemsModifier!: Item[];

  @Field(() => Item)
  @OneToMany(() => Item, item => item.modifier)
  itemsCreator!: Item[];

  @Field(() => Project)
  @OneToMany(() => Project, project => project.creator)
  projectCreator!: Project[];

  @Field(() => Project)
  @OneToMany(() => Project, project => project.modifier)
  projectModifier!: Project[];

  @Field(() => Lock)
  @OneToMany(() => Lock, lock => lock.user)
  locks!: Lock[];

  @Field(() => Activity)
  @OneToMany(() => Activity, activity => activity.user)
  change!: Activity[];

  @Field(() => Activity)
  @OneToMany(() => Activity, activity => activity.performer)
  activity!: Activity[];

  @Field(() => Project)
  @ManyToMany(() => Project, project => project.isFavorite)
  @JoinTable()
  favorites!: Project[];

  @Field(() => Project)
  @ManyToMany(() => Project, project => project.owners)
  @JoinTable()
  owner!: Project[];

  @Field(() => Project)
  @ManyToMany(() => Project, project => project.members)
  @JoinTable()
  member!: Project[];

  @Field(() => Project)
  @ManyToMany(() => Project, project => project.viewers)
  @JoinTable()
  viewer!: Project[];
}
