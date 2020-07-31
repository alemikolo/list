import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { List } from '@modules/list/types';
import { Settings } from '@modules/settings/types';
import { AccountStatus, User as UserModel } from '@modules/user/types';

@Entity()
export default class User implements UserModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  activeAt!: Date;

  @Column({ length: 256, nullable: true, type: 'varchar' })
  avatarUrl!: string;

  @Column({ length: 100, nullable: false, type: 'varchar', unique: true })
  email!: string;

  @Column({ length: 128, nullable: true, type: 'varchar', unique: true })
  hashedEmail!: string;

  @OneToMany('List', 'creator')
  listCreator!: List[];

  @OneToMany('List', 'modifier')
  listModifier!: List[];

  @Column({ length: 50, nullable: false, type: 'varchar' })
  name!: string;

  @Column({ length: 128, nullable: true, type: 'varchar' })
  password!: string;

  @Column({ length: 50, nullable: true, type: 'varchar' })
  provider!: string;

  @OneToOne('Settings', {
    nullable: true
  })
  @JoinColumn()
  settings!: Settings;

  @Column({
    default: AccountStatus.ACTIVE,
    enum: AccountStatus,
    nullable: false,
    type: 'enum'
  })
  status!: AccountStatus;
}
