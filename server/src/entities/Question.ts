import { ObjectType, Field, Int } from "type-graphql";
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@ObjectType()
@Entity()
export class Question extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  actorName: string;

  @Field(() => String)
  @Column()
  actorImage: string;

  @Field(() => String)
  @Column()
  movie: string;

  @Field(() => String)
  @Column()
  movieImage: string;

  @Field(() => Boolean)
  @Column()
  hasPlayed: boolean;
}
