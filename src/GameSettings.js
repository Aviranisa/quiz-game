import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const DIFFICULTY_VIEW = {
  view: "Difficulty",
  levels: [
    { value: "easy", view: "Easy" },
    { value: "medium", view: "Medium" },
    { value: "hard", view: "Hard" },
  ],
};

const TYPE_OF_QUESTION = {
  view: "Qestions Type",
  types: [
    { value: "multiple", view: "Multiple" },
    { value: "boolean", view: `true / false` },
  ],
};

function GameSettings() {
  const [isDifficultyView, setisDifficultyView] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [isamountQuestionsView, setAmountQuestionsView] = useState(false);
  const [amountQuestions, setAmountQuestions] = useState("10");
  const [isQuestionsTypeView, setIsQuestionsTypeView] = useState(false);
  const [questionsType, setQuestionsType] = useState("multiple");
  const [istimersTimeView, setIstimersTimeView] = useState(false);
  const [timersTime, setTimersTime] = useState(20);
  const [canStartView, setCanStartView] = useState(false);

  const difficultyChanged = (value) => {
    setDifficulty(value);
  };

  const difficultyView = useMemo(() => {
    return (
      <div>
        <div
          onClick={() => {
            setisDifficultyView(!isDifficultyView);
          }}
          className="strings pointer header"
        >
          {DIFFICULTY_VIEW.view}
        </div>
        {isDifficultyView &&
          DIFFICULTY_VIEW.levels.map((level, i) => {
            return (
              <span key={i} className="strings radio-buttons">
                <input
                  type="radio"
                  className="pointer"
                  name="difficulty"
                  value={level.value}
                  onChange={(e) => {
                    difficultyChanged(e.target.value);
                  }}
                />
                <label> {level.view}</label>
              </span>
            );
          })}
      </div>
    );
  }, [isDifficultyView]);

  const amountOfQuestionsChanged = (value) => {
    setAmountQuestions(value);
  };

  const amountOfQuestions = useMemo(() => {
    return (
      <div>
        <div
          onClick={() => {
            setAmountQuestionsView(!isamountQuestionsView);
          }}
          className="strings pointer header"
        >
          Amount Of Questions
        </div>
        {isamountQuestionsView && (
          <input
            type="numbers"
            placeholder="numbers (5-50)"
            className="inputs settings-inputs strings"
            max={50}
            min={1}
            onChange={(e) => {
              amountOfQuestionsChanged(e.target.value);
            }}
          />
        )}
      </div>
    );
  }, [isamountQuestionsView]);

  const typeOfQuestionschanged = (value) => {
    setQuestionsType(value);
  };

  const typeOfQuestions = useMemo(() => {
    return (
      <div>
        <div
          onClick={() => {
            setIsQuestionsTypeView(!isQuestionsTypeView);
          }}
          className="strings pointer header"
        >
          {TYPE_OF_QUESTION.view}
        </div>
        {isQuestionsTypeView &&
          TYPE_OF_QUESTION.types.map((type, i) => {
            return (
              <span key={i} className="strings radio-buttons">
                <input
                  type="radio"
                  className="pointer"
                  name="typeOfQuestions"
                  value={type.value}
                  onChange={(e) => {
                    typeOfQuestionschanged(e.target.value);
                  }}
                />
                <label>{type.view}</label>
              </span>
            );
          })}
      </div>
    );
  }, [isQuestionsTypeView]);

  const timersTimechanged = (value) => {
    setTimersTime(value);
  };

  const timeForTimers = useMemo(() => {
    return (
      <div>
        <div
          onClick={() => {
            setIstimersTimeView(!istimersTimeView);
          }}
          className="strings pointer header"
        >
          Amount seconds per question(default 20 seconds)
        </div>
        {istimersTimeView && (
          <input
            type="numbers"
            placeholder="seconds (10-60)"
            max={50}
            min={1}
            className="inputs settings-inputs strings"
            onChange={(e) => {
              timersTimechanged(e.target.value);
            }}
          />
        )}
      </div>
    );
  }, [istimersTimeView]);

  const settingsOrStartView = useMemo(() => {
    return (
      <div>
        {!canStartView ? (
          <div>
            <div>
              <div>{amountOfQuestions}</div>
              <div>{difficultyView}</div>
              <div>{typeOfQuestions}</div>
              <div>{timeForTimers}</div>
            </div>
            <div>
              <button
                onClick={() => {
                  let amountQuestionsNumber = parseInt(amountQuestions);
                  let timeForTimersNumber = parseInt(timersTime);
                  if (
                    amountQuestionsNumber >= 5 &&
                    amountQuestionsNumber <= 50 &&
                    timeForTimersNumber >= 10 &&
                    timeForTimersNumber <= 60
                  ) {
                    setCanStartView(true);
                  } else {
                    alert(
                      "The numbers you wrote are invalid Please meet the restrictions"
                    );
                  }
                }}
                className="buttons links"
              >
                Save settings
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Link
              to="/StartGame"
              state={{
                difficulty: difficulty,
                amountQuestions: amountQuestions,
                questionsType: questionsType,
                timersTime: parseInt(timersTime),
              }}
              className="links strings start-now pointer"
            >
              Start Now!
            </Link>
            <div
              className="links strings pointer"
              onClick={() => {
                setCanStartView(false);
              }}
            >
              settings
            </div>
          </div>
        )}
      </div>
    );
  }, [
    amountOfQuestions,
    amountQuestions,
    canStartView,
    difficulty,
    difficultyView,
    questionsType,
    timeForTimers,
    timersTime,
    typeOfQuestions,
  ]);

  return <div>{settingsOrStartView}</div>;
}
export default GameSettings;
