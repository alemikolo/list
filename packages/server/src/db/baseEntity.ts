import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Field } from 'type-graphql';

abstract class Entity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @CreateDateColumn({ nullable: false, type: 'timestamptz' })
  createdAt!: Date;

  @Field()
  @CreateDateColumn({ nullable: false, type: 'timestamptz' })
  updatedAt!: Date;
}

export default Entity;
