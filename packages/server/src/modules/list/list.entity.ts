import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '@modules/user/types';
import { ListStatus, List as ListModel } from '@modules/list/types';

@Entity()
export default class List implements ListModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('User', 'listCreator', { nullable: false })
  creator!: User;

  @Column({ length: 1000, nullable: true, type: 'varchar' })
  description!: string;

  @Column({ length: 50, nullable: false, type: 'varchar' })
  name!: string;

  @ManyToOne('User', 'listModifier', { nullable: false })
  modifier!: User;

  @Column({
    default: ListStatus.ACTIVE,
    enum: ListStatus,
    nullable: false,
    type: 'enum'
  })
  status!: ListStatus;
}
