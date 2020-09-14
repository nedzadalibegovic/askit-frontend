import React, { useContext } from "react";

import QuestionList from "../question-list";
import { AuthContext } from "../../contexts/auth";

const LatestQuestions = () => {
  const { apiCall } = useContext(AuthContext);

  const getLatestQuestions = async (pageNum = 1) => {
    return apiCall("/public/", "latest-questions", "page=" + (pageNum - 1));
  };

  return (
    <QuestionList title="Latest Questions" fetchFunc={getLatestQuestions} />
  );
};

export default LatestQuestions;
