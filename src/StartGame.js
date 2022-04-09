import "./App.css";
import { useLocation } from "react-router-dom";
import { useCallback, useState } from "react";
import QuestionView from "./QuestionView";
import useGetQuestions from "./useGetQuestions";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
const CORRECT_ANSWER_POINTS = 100;

function StartGame({ username }) {
  // const yesOrNoQuestion = useGetYesOrNoQuestion();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnwers, setUserAnwers] = useState([]);
  const location = useLocation();
  const { difficulty, amountQuestions, questionsType, timersTime } =
    location.state;
  const gameQuestions = useGetQuestions(
    difficulty,
    amountQuestions,
    questionsType
  );

  const moveToNextQuestion = useCallback(
    (timeoutId) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setIndex(index + 1);
    },
    [index]
  );

  const addUserAnswer = useCallback(
    (answer, timeoutId) => {
      setUserAnwers([...userAnwers, answer]);
      moveToNextQuestion(timeoutId);
    },
    [userAnwers, moveToNextQuestion]
  );
  const userAnweredCorrectly = useCallback(() => {
    setScore(score + CORRECT_ANSWER_POINTS);
  }, [score]);

  if (index < amountQuestions) {
    return (
      <div>
        {!gameQuestions ? (
          <div>
            <div>Loading...</div>
            <div className="App">
              <ReactLoading
                type={"cylon"}
                color={"blue"}
                height={30}
                width={30}
              />
            </div>
          </div>
        ) : (
          <QuestionView
            questionObj={gameQuestions[index]}
            questionIndex={index + 1}
            addUserAnswer={addUserAnswer}
            userAnweredCorrectly={userAnweredCorrectly}
            moveToNextQuestion={moveToNextQuestion}
            timersTime={timersTime}
          />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <div className="strings score-continer">{`${localStorage.getItem(
          "username"
        )} your score is: ${score} Points`}</div>
        <Link to={"/"} className="links strings pointer">
          start new game
        </Link>
      </div>
    );
  }
}
export default StartGame;
