import { IconButton, Image, Stack } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import { ANSWER_QUERY, QUESTION_QUERY } from "./graphql";

export const Quizz = ({
  onFinish,
  addScore,
}: {
  onFinish: () => void;
  addScore: () => void;
}) => {
  const [question, setQuestion] = useState<any>();

  const [result, getQuestion] = useQuery({
    query: QUESTION_QUERY,
    pause: false,
  });

  const [answer, submitAnswer] = useMutation(ANSWER_QUERY);

  useEffect(() => {
    if (result.data) {
      setQuestion(result.data.getQuestion);
    }
  }, [result]);

  const getImageLink = (path: string) => {
    if (path) {
      return `https://image.tmdb.org/t/p/original${path}`;
    } else {
      return undefined;
    }
  };

  const submit = async (response: boolean) => {
    await submitAnswer({
      answer: { questionId: question.id, hasPlayed: response },
    });
  };

  useEffect(() => {
    if (answer.data) {
      if (answer.data?.checkAnswer) {
        addScore();
        getQuestion({ requestPolicy: "network-only" });
      } else {
        onFinish();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  return (
    <div>
      <Stack direction="row" spacing="24px" marginBottom={5}>
        <div className="center-column">
          <h5>Actor</h5>
          <Image
            boxSize="250px"
            src={getImageLink(question?.actorImage)}
            fallbackSrc="https://via.placeholder.com/150"
            alt="actor"
            style={{ objectFit: "contain" }}
          />
          <h2>{question?.actorName}</h2>
        </div>
        <div className="center-column">
          <p>Movie</p>
          <Image
            boxSize="250px"
            src={getImageLink(question?.movieImage)}
            fallbackSrc="https://via.placeholder.com/150"
            alt="movie"
            style={{ objectFit: "contain" }}
          />
          <h2>{question?.movie} </h2>
        </div>
      </Stack>
      <Stack direction="row" spacing="24px" className="center-column">
        <IconButton
          aria-label="like"
          icon={<CheckIcon />}
          colorScheme="green"
          size="sm"
          onClick={() => submit(true)}
        />
        <IconButton
          aria-label="dislike"
          icon={<CloseIcon />}
          colorScheme="red"
          size="sm"
          onClick={() => submit(false)}
        />
      </Stack>
    </div>
  );
};
