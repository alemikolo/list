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
import User from '@modules/user/entity';
import Item from '@modules/item/entity';
import { Icon } from '@shared/types';

@Entity()
export default class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 7, nullable: true, type: 'varchar' })
  color!: string;

  @Column({ length: 1000, nullable: true, type: 'varchar' })
  description!: string;

  @Column({
    enum: Icon,
    nullable: true,
    type: 'enum'
  })
  icon!: Icon;

  @Column({ length: 50, nullable: false, type: 'varchar' })
  name!: string;

  @OneToMany(() => Activity, activity => activity.category)
  change!: Activity[];

  @OneToMany(() => Item, item => item.category)
  items!: Item[];

  @ManyToOne(() => User, user => user.categoryCreator, { nullable: false })
  creator!: User;

  @ManyToOne(() => User, user => user.categoryModifier, { nullable: false })
  modifier!: User;
}
