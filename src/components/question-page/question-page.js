import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Question from "../question";
import Answer from "../answer";

const QuestionPage = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);

  const getQuestion = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/questions/" + id + "?user=true"
    );
    const json = await response.json();

    if (response.ok) setQuestion(json);
  };

  const getAnswers = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/answers/" + id + "?user=true"
    );
    const json = await response.json();

    if (response.ok) setAnswers(json);
  };

  useEffect(() => {
    getQuestion();
    getAnswers();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg="7" md="8">
          {question && (
            <Question
              title={question.Title}
              email={question.user.Email}
              firstname={question.user.FirstName}
              lastname={question.user.LastName}
              body={question.Body}
              likes={question.LikeCount}
              dislikes={question.DislikeCount}
              answers={question.AnswerCount}
            />
          )}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg="7" md="8">
          {answers &&
            answers.results.map((answer) => (
              <Answer
                body={answer.Body}
                email={answer.user.Email}
                firstname={answer.user.FirstName}
                lastname={answer.user.LastName}
                likes={answer.LikeCount}
                dislikes={answer.DislikeCount}
                key={[answer.QuestionID, answer.UserID]}
              />
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionPage;
