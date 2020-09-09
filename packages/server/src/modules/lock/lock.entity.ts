/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import Item from '@modules/item/item.entity';
import List from '@modules/list/list.entity';
import User from '@modules/user/user.entity';

@Entity()
export default class Lock extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 32, nullable: true, type: 'varchar' })
  field!: string;

  @ManyToOne(() => Item, item => item.locks, { nullable: true })
  item!: Item;

  @ManyToOne(() => List, list => list.locks, { nullable: true })
  list!: List;

  @ManyToOne(() => User, user => user.locks, { nullable: true })
  user!: User;
}
