import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Question from "../question";
import styles from "./latest-questions.module.css";

const LatestQuestions = () => {
  const [questions, setQuestions] = useState({});

  const getLatestQuestions = async () => {
    const response = await fetch("http://localhost:3000/questions/latest");
    const json = await response.json();

    setQuestions(json);
  };

  useEffect(() => {
    getLatestQuestions();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h4 className={styles.headerstyle}>Latest Questions</h4>
        </Col>
      </Row>
      <Row>
        {questions.results &&
          questions.results.map((question) => (
            <Question
              key={question.QuestionID}
              title={question.Title}
              email={question.user.Email}
              firstname={question.user.FirstName}
              lastname={question.user.LastName}
              body={question.Body}
              likes={question.LikeCount}
              dislikes={question.DislikeCount}
              answers={question.AnswerCount}
            />
          ))}
      </Row>
    </Container>
  );
};

export default LatestQuestions;
