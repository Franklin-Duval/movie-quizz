import { Wrapper } from "../components/Wrapper";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useEffect, useState } from "react";
import { Button, Heading } from "@chakra-ui/react";
import { Timer } from "../components/Timer";
import { Dialog } from "../components/Modal";
import { Quizz } from "../components/Quizz";

const PlayPage = () => {
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [score, setScore] = useState(0);
  const [previousScore, setPreviousScore] = useState(0);

  useEffect(() => {
    setPreviousScore(Number(localStorage.getItem("score") || 0));
  }, []);

  const endGame = () => {
    setFinish(true);
  };

  const resetGame = () => {
    setFinish(false);
    setStart(false);
    setScore(0);
    if (score > previousScore) {
      localStorage.setItem("score", score.toString());
      setPreviousScore(score);
    }
  };

  return (
    <Wrapper>
      <div className="center-column">
        {!start ? (
          <Button colorScheme="blue" onClick={() => setStart(true)}>
            Commencer la partie
          </Button>
        ) : (
          <>
            <Timer onFinish={endGame} />
            <Quizz onFinish={endGame} addScore={() => setScore(score + 1)} />
          </>
        )}

        <Dialog
          open={finish}
          close={() => {
            setFinish(false);
            setStart(false);
          }}
        >
          <div className="center-column">
            <h2>Score</h2>
            <Heading as="h2" size="xl">
              {score}
            </Heading>

            <Button colorScheme="blue" onClick={resetGame}>
              Rejouer
            </Button>
            <p>
              Meilleur score: {score > previousScore ? score : previousScore}
            </p>
          </div>
        </Dialog>
      </div>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(PlayPage);
