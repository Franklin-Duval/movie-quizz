import { InputType, Field, Int } from "type-graphql";

@InputType()
export class UserInput {
  @Field(() => String)
  username!: string;
  @Field(() => String)
  email!: string;
}

@InputType()
export class QuestionInput {
  @Field(() => String)
  actorName: string;

  @Field(() => String)
  actorImage: string;

  @Field(() => String)
  movie: string;

  @Field(() => String)
  movieImage: string;

  @Field(() => Boolean)
  hasPlayed: boolean;
}
@InputType()
export class AnswerInput {
  @Field(() => Int)
  questionId: number;

  @Field(() => Boolean)
  hasPlayed: boolean;
}
