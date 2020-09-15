import React, { useContext } from "react";

import QuestionList from "../question-list";
import { AuthContext } from "../../contexts/auth";

const PopularQuestions = () => {
  const { apiCall } = useContext(AuthContext);

  const getPopularQuestions = async (pageNum = 1) => {
    return apiCall("/public", "popular-questions", "page=" + (pageNum - 1));
  };

  return (
    <QuestionList title="Popular Questions" fetchFunc={getPopularQuestions} />
  );
};

export default PopularQuestions;
