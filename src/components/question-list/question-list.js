import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Question from "../question";
import styles from "./question-list.module.css";
import LoadMore from "../load-more";

const QuestionList = ({ title, fetchFunc }) => {
  const [questions, setQuestions] = useState(null);
  const [activePage, setActivePage] = useState(1);

  const fetchQuestions = async (pageNum = 1) => {
    const response = await fetchFunc(pageNum);
    const json = await response.json();

    if (response.ok) {
      setActivePage(pageNum);
      setQuestions(json);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h4 className={styles.headerstyle}>{title}</h4>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {questions?.results.map((question) => (
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
      <Row className="justify-content-center">
        <LoadMore
          total={questions?.total}
          page={activePage}
          func={fetchQuestions}
        />
      </Row>
    </Container>
  );
};

export default QuestionList;
