import axios from "axios";
import { useState, useMemo, useCallback, useEffect } from "react";
import { getRandomNumbers } from "./services/questionsService";

const useGetQuestions = (difficulty, amountQuestions, questionsType) => {
  const [allQuestions, setAllQuestions] = useState(null);
  const [gameQuestions, setGameQuestions] = useState();

  useEffect(() => {
    console.log(difficulty);
    console.log(amountQuestions);
  }, [difficulty, amountQuestions]);

  const fetchAllQuestions = useCallback(async () => {
    const res = await axios.get(
      `https://opentdb.com/api.php?amount=${amountQuestions}&difficulty=${difficulty}&type=${questionsType}`
    );
    const questions = await res.data.results;
    setAllQuestions(questions);
  }, [difficulty, amountQuestions, questionsType]);

  useMemo(async () => {
    const randomQuestions = [];
    if (allQuestions === null) {
      await fetchAllQuestions();
      return console.log("Loading...");
    } else {
      const questionsIndexes = getRandomNumbers(
        amountQuestions,
        allQuestions.length
      );
      questionsIndexes.forEach((questionIndex) => {
        randomQuestions.push(allQuestions[questionIndex]);
      });
      setGameQuestions(randomQuestions);
    }
  }, [allQuestions, amountQuestions, fetchAllQuestions]);

  return gameQuestions;
};
export default useGetQuestions;
