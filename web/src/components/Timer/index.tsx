import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const TimerContainer = styled.div`
  border: 2px solid black;
  padding: 10px;
  min-width: 100px;
  border-radius: 10px;
  font-family: Times New Roman;
  font-size: 30px;
  margin-bottom: 50px;
`;

export const Timer = ({ onFinish }: { onFinish: () => void }) => {
  const [countDown, setCountDown] = useState(60);

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000);
    } else {
      onFinish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown]);

  return (
    <TimerContainer className="center-column"> {countDown} sec </TimerContainer>
  );
};
