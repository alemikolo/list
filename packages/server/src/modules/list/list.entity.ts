/* eslint-disable import/no-cycle */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import Activity from '@modules/activity/activity.entity';
import Item from '@modules/item/item.entity';
import Lock from '@modules/lock/lock.entity';
import User from '@modules/user/user.entity';
import { Status, Type } from '@shared/types';

@Entity()
export default class List {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 1000, nullable: true, type: 'varchar' })
  description!: string;

  @Column({ length: 50, nullable: false, type: 'varchar' })
  name!: string;

  @Column({
    default: Type.BASIC,
    enum: Type,
    nullable: false,
    type: 'enum'
  })
  type!: Type;

  @Column({
    default: Status.ACTIVE,
    enum: Status,
    nullable: false,
    type: 'enum'
  })
  status!: Status;

  @ManyToMany(() => User, user => user.favorites)
  isFavorite!: User[];

  @OneToMany(() => Item, item => item.list)
  items!: Item[];

  @OneToMany(() => Activity, activity => activity.list)
  change!: Activity[];

  @OneToMany(() => Lock, lock => lock.list)
  locks!: Lock[];

  @ManyToOne(() => User, user => user.listsCreator, { nullable: false })
  creator!: User;

  @ManyToOne(() => User, user => user.listsModifier, { nullable: false })
  modifier!: User;

  @ManyToMany(() => List, list => list.complexLists)
  @JoinTable()
  lists!: List[];

  @ManyToMany(() => List, list => list.lists)
  complexLists!: List[];

  @ManyToMany(() => User, user => user.owner)
  owners!: User[];

  @ManyToMany(() => User, user => user.editor)
  editors!: User[];

  @ManyToMany(() => User, user => user.viewer)
  viewers!: User[];
}
