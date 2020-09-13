import React, { useEffect, useState } from "react";

import QuestionList from "../question-list";

const LatestQuestions = () => {
  const [questions, setQuestions] = useState(null);

  const getLatestQuestions = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/public/latest-questions"
    );
    const json = await response.json();

    if (response.ok) setQuestions(json);
  };

  useEffect(() => {
    getLatestQuestions();
  }, []);

  return (
    questions && (
      <QuestionList title="Latest Questions" questions={questions.results} />
    )
  );
};

export default LatestQuestions;
