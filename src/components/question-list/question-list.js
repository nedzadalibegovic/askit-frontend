import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Question from "../question";
import styles from "./question-list.module.css";
import LoadMore from "../load-more";
import { AuthContext } from "../../contexts/auth";

const QuestionList = ({ title, fetchFunc }) => {
  const [questions, setQuestions] = useState();
  const [activePage, setActivePage] = useState(1);

  const { token } = useContext(AuthContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [token]);

  return (
    <Container>
      <Row>
        <Col>
          <h4 className={styles.headerstyle}>{title}</h4>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col style={{ padding: "0px" }}>
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
              questionId={question.QuestionID}
              showLink
              ratings={question.ratings}
            />
          ))}
        </Col>
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
