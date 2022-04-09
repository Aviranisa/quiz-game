import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { collectPossibleAnswers } from "./services/questionsService";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ReactLoading from "react-loading";

function QuestionView({
  questionObj,
  questionIndex,
  addUserAnswer,
  userAnweredCorrectly,
  moveToNextQuestion,
  timersTime,
}) {
  const possibleAnswers = collectPossibleAnswers(questionObj);
  const [timeoutId, setTimeoutId] = useState();
  const [repeatTimer, setRepeatTimer] = useState(false);

  const createTimeout = () => {
    const timeoutID = setTimeout(() => {
      moveToNextQuestion();
    }, timersTime * 1000);
    setTimeoutId(timeoutID);
  };

  useEffect(() => {
    createTimeout();
    setRepeatTimer(true);
  }, [questionIndex]);

  const UrgeWithPleasureComponent = useMemo(() => {
    return (
      <CountdownCircleTimer
        isPlaying
        duration={timersTime}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 5, 2, 0]}
        updateInterval={0}
        size={100}
        onComplete={(totalElapsedTime) => {
          return { shouldRepeat: true, newInitialRemainingTime: timersTime };
        }}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    );
  }, []);

  const possibleAnswersView = useMemo(() => {
    return possibleAnswers.map((possibleAnswer, i) => {
      return (
        <div
          onClick={() => {
            if (possibleAnswer.correct_answer) {
              userAnweredCorrectly();
            }
            addUserAnswer(i + 1, timeoutId);
            setRepeatTimer(false);
          }}
          key={i}
          className="answer strings pointer"
        >{`${i + 1}. ${possibleAnswer.possibleAnswer}`}</div>
      );
    });
  }, [possibleAnswers, addUserAnswer, userAnweredCorrectly, timeoutId]);
  return !questionObj && possibleAnswers.length === 0 ? (
    <div>
      <div>Loading Question...</div>
      <div>
        <ReactLoading type={"cylon"} color={"blue"} height={30} width={30} />
      </div>
    </div>
  ) : (
    <div>
      {repeatTimer && (
        <div className="progressTimerBar">{UrgeWithPleasureComponent}</div>
      )}
      <div className="strings header">{`${questionIndex}. ${questionObj.question}`}</div>
      {possibleAnswersView}
    </div>
  );
}
export default QuestionView;
