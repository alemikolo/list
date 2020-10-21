/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import BaseEntity from '@db/baseEntity';
import Activity from '@modules/activity/entity';
import User from '@modules/user/entity';
import Item from '@modules/item/entity';
import { Icon } from '@shared/enums';

@ObjectType()
@Entity()
export default class Category extends BaseEntity {
  @Field()
  @Column({ length: 7, nullable: true, type: 'varchar' })
  color!: string;

  @Field()
  @Column({ length: 1000, nullable: true, type: 'varchar' })
  description!: string;

  @Field(() => Icon)
  @Column({
    enum: Icon,
    nullable: true,
    type: 'enum'
  })
  icon!: Icon;

  @Field()
  @Column({ length: 50, nullable: false, type: 'varchar' })
  name!: string;

  @Field(() => Activity)
  @OneToMany(() => Activity, activity => activity.category)
  change!: Activity[];

  @Field(() => Item)
  @OneToMany(() => Item, item => item.category)
  items!: Item[];

  @Field(() => User)
  @ManyToOne(() => User, user => user.categoryCreator, { nullable: false })
  creator!: User;

  @Field(() => User)
  @ManyToOne(() => User, user => user.categoryModifier, { nullable: false })
  modifier!: User;
}
