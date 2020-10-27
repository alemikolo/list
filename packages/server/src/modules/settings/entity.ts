/* eslint-disable import/no-cycle */
import { Column, Entity, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import Activity from '@modules/activity/entity';

@ObjectType()
@Entity()
export default class Settings extends BaseEntity {
  @Field({ nullable: true })
  @Column({ length: 128, nullable: true, type: 'varchar' })
  notification!: string;

  @Field({ nullable: true })
  @Column({ length: 64, nullable: true, type: 'varchar' })
  theme!: string;

  @Field(() => Activity)
  @OneToMany(() => Activity, activity => activity.settings)
  change!: Activity[];
}
