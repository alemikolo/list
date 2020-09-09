/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import Activity from '@modules/activity/entity';
import Category from '@modules/category/entity';
import List from '@modules/list/entity';
import Lock from '@modules/lock/entity';
import User from '@modules/user/entity';
import { Priority, Status } from '@shared/types';

@Entity()
export default class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 1000, nullable: true, type: 'varchar' })
  description!: string;

  @Column({
    default: false,
    nullable: false
  })
  done!: boolean;

  @Column({ length: 512, nullable: true, type: 'varchar' })
  link!: string;

  @Column({ length: 50, nullable: false, type: 'varchar' })
  name!: string;

  @Column({
    default: Priority.NORMAL,
    enum: Priority,
    nullable: false,
    type: 'enum'
  })
  priority!: Priority;

  @Column({
    default: Status.ACTIVE,
    enum: Status,
    nullable: false,
    type: 'enum'
  })
  status!: Status;

  @OneToMany(() => Activity, activity => activity.item)
  change!: Activity[];

  @OneToMany(() => Lock, lock => lock.item)
  locks!: Lock[];

  @ManyToOne(() => Category, category => category.items, { nullable: true })
  category!: Category;

  @ManyToOne(() => User, user => user.itemsCreator, { nullable: false })
  creator!: User;

  @ManyToOne(() => User, user => user.itemsModifier, { nullable: false })
  modifier!: User;

  @ManyToOne(() => List, list => list.items, { nullable: false })
  list!: List;
}
