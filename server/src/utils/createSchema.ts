import { GraphQLSchema } from "graphql";
import { QuestionResolver } from "../resolvers/question";
import { buildSchema } from "type-graphql";
import { userResolver } from "../resolvers/user";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [userResolver, QuestionResolver],
    validate: false,
  });
