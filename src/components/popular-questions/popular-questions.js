import React, { useState, useEffect } from "react";

import QuestionList from "../question-list";

const PopularQuestions = () => {
  const [questions, setQuestions] = useState(null);

  const getPopularQuestions = async () => {
    const response = await fetch("http://localhost:3000/questions/popular");
    const json = await response.json();

    if (response.ok) setQuestions(json);
  };

  useEffect(() => {
    getPopularQuestions();
  }, []);

  return (
    questions && (
      <QuestionList title="Popular Questions" questions={questions.results} />
    )
  );
};

export default PopularQuestions;
