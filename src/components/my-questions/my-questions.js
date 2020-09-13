import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { AuthContext } from "../../contexts/auth";
import LoadMore from "../load-more";
import Question from "../question";
import styles from "./my-questions.module.css";

const MyQuestions = () => {
  const [questions, setQuestions] = useState(null);
  const [activePage, setActivePage] = useState(1);

  const { token, setToken } = useContext(AuthContext);

  const getMyQuestions = async (pageNum = 1) => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/questions?page=" + (pageNum - 1),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      setQuestions(json);
      setActivePage(pageNum);
    }

    if (response.status === 401) setToken(null);
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
          {questions &&
            questions.results.map((question) => (
              <Question
                key={question.QuestionID}
                title={question.Title}
                body={question.Body}
                likes={question.LikeCount}
                dislikes={question.DislikeCount}
                answers={question.AnswerCount}
                id={question.QuestionID}
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
