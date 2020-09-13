import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Question from "../question";
import styles from "./question-list.module.css";

const QuestionList = ({ title, questions }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h4 className={styles.headerstyle}>{title}</h4>
        </Col>
      </Row>
      <Row>
        {questions.map((question) => (
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
            id={question.QuestionID}
          />
        ))}
      </Row>
    </Container>
  );
};

export default QuestionList;
