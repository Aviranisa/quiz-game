import "./App.css";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
const SETTINGS_LINK = "Settings";
const START_GAME_LINK = {
  to: "/StartGame",
  defaultSettings: {
    difficulty: "medium",
    amountQuestions: "10",
    questionsType: "multiple",
    timersTime: 20,
  },
  view: "Start Now!",
};
const RULES = [
  `You have to write your name to start.`,
  `in the settings you can determine the amount of questions, three
            levels of questions, multiple or true / false answers end seconds
            per question.`,
  `the default options are 10 multiple questions, medium difficulty, 20
            seconds per question.`,
];
function QuizMainPage() {
  const [username, setUsername] = useState(null);
  const [isNameExists, setisNameExists] = useState(false);

  useMemo(() => {
    if (localStorage.getItem("username")) {
      localStorage.clear(username);
      localStorage.setItem("username", username);
    }
    localStorage.setItem("username", username);
  }, [isNameExists, username]);

  const startGmaeView = () => {
    return isNameExists ? (
      <div>
        <span>
          <Link to={`/${SETTINGS_LINK}`} className="links strings">
            {SETTINGS_LINK}
          </Link>
        </span>
        <span>
          <Link
            to={`${START_GAME_LINK.to}`}
            state={START_GAME_LINK.defaultSettings}
            className="links strings start-now"
          >
            {START_GAME_LINK.view}
          </Link>
        </span>
      </div>
    ) : (
      <div className="strings">
        name:
        <input
          type="text"
          className="name-inputs strings inputs"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button
          className="saveNameButton strings"
          onClick={() => {
            if (username) {
              setisNameExists(true);
            } else {
              alert("username is not valid");
            }
          }}
        >
          save
        </button>
      </div>
    );
  };

  const rules = () => {
    return RULES.map((rule, i) => {
      return (
        <ul>
          <li className="strings rules" key={i}>
            {rule}
          </li>
        </ul>
      );
    });
  };

  return (
    <div>
      <div>{rules()}</div>
      <div>{startGmaeView()}</div>
    </div>
  );
}
export default QuizMainPage;
