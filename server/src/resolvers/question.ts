import { Question } from "../entities/Question";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AnswerInput, QuestionInput } from "../types";

@Resolver()
export class QuestionResolver {
  @Query(() => Question, { nullable: true })
  async getQuestion(): Promise<Question> {
    const questions = await Question.find({});
    const index = Math.floor(Math.random() * questions.length);
    return questions[index];
  }

  @Mutation(() => Question)
  createQuestion(
    @Arg("question", () => QuestionInput) question: QuestionInput
  ): Promise<Question> {
    return Question.create(question).save();
  }

  @Mutation(() => Boolean, { nullable: true })
  async checkAnswer(@Arg("answer") answer: AnswerInput): Promise<Boolean> {
    const ques = await Question.findOne({ id: answer.questionId });
    console.log(ques);

    return ques?.hasPlayed === answer.hasPlayed;
  }
}
