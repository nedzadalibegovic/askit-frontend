import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";
import LoadMore from "../load-more";
import NewQuestion from "../new-question/new-question";
import Question from "../question";
import styles from "./my-questions.module.css";

const MyQuestions = () => {
  const [questions, setQuestions] = useState(null);
  const [activePage, setActivePage] = useState(1);

  const { token, apiCall } = useContext(AuthContext);

  const history = useHistory();

  const getMyQuestions = async (pageNum = 1) => {
    const response = await apiCall("/questions", "", "page=" + (pageNum - 1));
    const json = await response.json();

    if (response.ok) {
      setQuestions(json);
      setActivePage(pageNum);
    }
  };

  const askNewQuestion = async ({ Title, Body }) => {
    const response = await apiCall("/questions", "", "", "POST", {
      Title,
      Body,
    });
    const json = await response.json();

    if (response.ok) history.push("/question/" + json.QuestionID);
  };

  useEffect(() => {
    if (token) getMyQuestions();
  }, [token]);

  return (
    <Container>
      <Row>
        <Col>
          <h4 className={styles.headerstyle}>My Questions</h4>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg="7" md="8">
          <NewQuestion submitFunc={askNewQuestion} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg="7" md="8">
          {questions &&
            questions.results.map((question) => (
              <Question
                key={question.QuestionID}
                title={question.Title}
                body={question.Body}
                likes={question.LikeCount}
                dislikes={question.DislikeCount}
                answers={question.AnswerCount}
                ratings={question.ratings}
                questionId={question.QuestionID}
                showLink
              />
            ))}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <LoadMore
          total={questions?.total}
          page={activePage}
          func={getMyQuestions}
        />
      </Row>
    </Container>
  );
};

export default MyQuestions;
