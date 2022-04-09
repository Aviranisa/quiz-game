export const questionsType = { multiple: "multiple", boolean: "boolean" };
export const getRandomNumbers = (numOfRandomNumbers, upperLimit) => {
  let numbers = [];

  while (numbers.length < numOfRandomNumbers) {
    let randomNum = Math.floor(Math.random() * upperLimit);
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  return numbers;
};

export const createUnorderedArray = (array) => {
  const unorderedArray = [];
  const randomIndexes = getRandomNumbers(array.length, array.length);
  randomIndexes.forEach((randomIndex) => {
    unorderedArray.push(array[randomIndex]);
  });
  return unorderedArray;
};

export const collectPossibleAnswers = (questionObj) => {
  const answers = [];
  questionObj.incorrect_answers.forEach((possibleAnswer) => {
    answers.push({ possibleAnswer, correct_answer: false });
  });
  answers.push({
    possibleAnswer: questionObj.correct_answer,
    correct_answer: true,
  });
  return createUnorderedArray(answers);
};
