import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Question from "../question";

const PopularQuestions = () => {
  const [questions, setQuestions] = useState({});

  const getPopularQuestions = async () => {
    const response = await fetch("http://localhost:3000/questions/popular");
    const json = await response.json();

    setQuestions(json);
  };

  useEffect(() => {
    getPopularQuestions();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h4 style={{ textAlign: "center" }}>Popular Questions</h4>
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

export default PopularQuestions;
