/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import Activity from '@modules/activity/activity.entity';
import Item from '@modules/item/item.entity';
import List from '@modules/list/list.entity';
import Lock from '@modules/lock/lock.entity';
import Settings from '@modules/settings/settings.entity';
import { AccountStatus } from '@shared/types';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, type: 'timestamp' })
  activeAt!: Date;

  @Column({ length: 256, nullable: true, type: 'varchar' })
  avatarUrl!: string;

  @Column({ length: 100, nullable: false, type: 'varchar', unique: true })
  email!: string;

  @Column({ length: 128, nullable: true, type: 'varchar', unique: true })
  hashedEmail!: string;

  @Column({ length: 50, nullable: false, type: 'varchar' })
  name!: string;

  @Column({ length: 128, nullable: true, type: 'varchar' })
  password!: string;

  @Column({ length: 50, nullable: true, type: 'varchar' })
  provider!: string;

  @Column({
    default: AccountStatus.ACTIVE,
    enum: AccountStatus,
    nullable: false,
    type: 'enum'
  })
  status!: AccountStatus;

  @OneToOne(() => Settings, {
    nullable: true
  })
  @JoinColumn()
  settings!: Settings;

  @OneToMany(() => Item, item => item.creator)
  itemsCreator!: Item[];

  @OneToMany(() => Item, item => item.modifier)
  itemsModifier!: Item[];

  @OneToMany(() => List, list => list.creator)
  listsCreator!: List[];

  @OneToMany(() => List, list => list.modifier)
  listsModifier!: List[];

  @OneToMany(() => Lock, lock => lock.user)
  locks!: Lock[];

  @OneToMany(() => Activity, activity => activity.user)
  change!: Activity[];

  @OneToMany(() => Activity, activity => activity.performer)
  activity!: Activity[];

  @ManyToMany(() => List, list => list.isFavorite)
  @JoinTable()
  favorites!: List[];

  @ManyToMany(() => List, list => list.owners)
  @JoinTable()
  owner!: List[];

  @ManyToMany(() => List, list => list.editors)
  @JoinTable()
  editor!: List[];

  @ManyToMany(() => List, list => list.viewers)
  @JoinTable()
  viewer!: List[];
}
