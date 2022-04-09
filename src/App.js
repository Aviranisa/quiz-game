import "./App.css";
import { Routes, Route } from "react-router-dom";
import QuizMainPage from "./QuizMainPage.js";
import StartGame from "./StartGame.js";
import QuestionView from "./QuestionView.js";
import GameSettings from "./GameSettings";

function App() {
  return (
    <div className="App">
      <div className="AppHeader">welcome to Aviran quiz game</div>
      <Routes>
        <Route path="/" element={<QuizMainPage />}>
          <Route path="QuizMainPage" element={<QuizMainPage />} />
        </Route>
        <Route path="Settings" element={<GameSettings />} />
        <Route path="StartGame" element={<StartGame />}>
          <Route path="QuestionView" element={<QuestionView />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
