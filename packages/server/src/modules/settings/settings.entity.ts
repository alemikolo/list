import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Settings as SettingsModel } from './types';

@Entity()
export default class Settings implements SettingsModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 128, nullable: true, type: 'varchar' })
  notification!: string;

  @Column({ length: 64, nullable: true, type: 'varchar' })
  theme!: string;
}
