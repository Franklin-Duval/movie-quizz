import { Wrapper } from "../components/Wrapper";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useState } from "react";
import { Button, Heading } from "@chakra-ui/react";
import { Timer } from "../components/Timer";
import { Dialog } from "../components/Modal";
import { Quizz } from "../components/Quizz";

const PlayPage = () => {
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <Wrapper>
      <div className="center-column">
        {!start ? (
          <Button colorScheme="blue" onClick={() => setStart(true)}>
            Commencer la partie
          </Button>
        ) : (
          <>
            <Timer onFinish={() => setFinish(true)} />
            <Quizz
              onFinish={() => setFinish(true)}
              addScore={() => setScore(score + 1)}
            />
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

            <Button
              colorScheme="blue"
              onClick={() => {
                setFinish(false);
                setStart(false);
                setScore(0);
              }}
            >
              Rejouer
            </Button>
          </div>
        </Dialog>
      </div>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(PlayPage);
