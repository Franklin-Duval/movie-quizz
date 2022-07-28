import gql from "graphql-tag";

export const QUESTION_QUERY = gql`
  query {
    getQuestion {
      id
      actorName
      actorImage
      movie
      movieImage
    }
  }
`;

export const ANSWER_QUERY = gql`
  mutation ($answer: AnswerInput!) {
    checkAnswer(answer: $answer)
  }
`;
