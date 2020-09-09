/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import Category from '@modules/category/entity';
import Item from '@modules/item/entity';
import List from '@modules/list/entity';
import Settings from '@modules/settings/entity';
import User from '@modules/user/entity';

@Entity()
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 32, nullable: true, type: 'varchar' })
  field!: string;

  @Column({ length: 256, type: 'varchar' })
  messageId!: string;

  @Column({ length: 1000, nullable: true, type: 'varchar' })
  newValue!: string;

  @Column({ length: 1000, nullable: true, type: 'varchar' })
  oldValue!: string;

  @ManyToOne(() => Category, category => category.change, {
    nullable: true
  })
  category!: Category;

  @ManyToOne(() => Item, item => item.change, { nullable: true })
  item!: Item;

  @ManyToOne(() => List, list => list.change, { nullable: true })
  list!: List;

  @ManyToOne(() => Settings, settings => settings.change, {
    nullable: true
  })
  settings!: Settings;

  @ManyToOne(() => User, user => user.change, { nullable: true })
  user!: User;

  @ManyToOne(() => User, user => user.activity)
  performer!: User;
}
