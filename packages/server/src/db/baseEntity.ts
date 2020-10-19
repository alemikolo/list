import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
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
