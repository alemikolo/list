/* eslint-disable import/no-cycle */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Activity from '@modules/activity/activity.entity';

@Entity()
export default class Settings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 128, nullable: true, type: 'varchar' })
  notification!: string;

  @Column({ length: 64, nullable: true, type: 'varchar' })
  theme!: string;

  @OneToMany(() => Activity, activity => activity.settings)
  change!: Activity[];
}
