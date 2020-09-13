import React from "react";

import QuestionList from "../question-list";

const PopularQuestions = () => {
  const getPopularQuestions = async (pageNum = 1) => {
    return fetch(
      process.env.REACT_APP_API_URL +
        "/public/popular-questions?page=" +
        (pageNum - 1)
    );
  };

  return (
    <QuestionList title="Popular Questions" fetchFunc={getPopularQuestions} />
  );
};

export default PopularQuestions;
