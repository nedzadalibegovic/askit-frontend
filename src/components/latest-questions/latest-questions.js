import React from "react";

import QuestionList from "../question-list";

const LatestQuestions = () => {
  const getLatestQuestions = async (pageNum = 1) => {
    return fetch(
      process.env.REACT_APP_API_URL +
        "/public/latest-questions?page=" +
        (pageNum - 1)
    );
  };

  return (
    <QuestionList title="Latest Questions" fetchFunc={getLatestQuestions} />
  );
};

export default LatestQuestions;
