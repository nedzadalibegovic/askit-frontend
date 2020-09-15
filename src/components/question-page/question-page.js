import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";

import Question from "../question";
import Answer from "../answer";
import LoadMore from "../load-more";
import { AuthContext } from "../../contexts/auth";
import TextBox from "../textbox";
import MyAnswer from "../my-answer/my-answer";

const QuestionPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const { token, apiCall } = useContext(AuthContext);

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [page, setPage] = useState(1);

  const getQuestion = async () => {
    const response = await apiCall("/questions", id, "user=true");
    const json = await response.json();

    if (response.ok) setQuestion(json);
  };

  const getAnswers = async (pageNum = 1) => {
    const response = await apiCall(
      "/answers",
      id,
      "user=true&page=" + (pageNum - 1)
    );
    const json = await response.json();

    if (response.ok) {
      setPage(pageNum);
      setAnswers(json);
    }
  };

  const postAnswer = async ({ Body }) => {
    const response = await apiCall("/answers", "", "", "POST", {
      QuestionID: question.QuestionID,
      Body: Body,
    });

    if (response.ok) history.go();
  };

  useEffect(() => {
    getQuestion();
    getAnswers();
  }, [token]);

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
              questionId={question.QuestionID}
              ratings={question.ratings}
            />
          )}
        </Col>
      </Row>
      {token && (
        <Row className="justify-content-center">
          <Col lg="7" md="8">
            {answers?.my ? (
              <MyAnswer
                body={answers.my.Body}
                likes={answers.my.LikeCount}
                dislikes={answers.my.DislikeCount}
                questionId={answers.my.QuestionID}
                userId={answers.my.UserID}
                ratings={answers.my.ratings}
              />
            ) : (
              <TextBox submitFunc={postAnswer} buttonText="Give answer" />
            )}
          </Col>
        </Row>
      )}
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
                questionId={answer.QuestionID}
                userId={answer.UserID}
                ratings={answer.ratings}
              />
            ))}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <LoadMore total={answers?.total} page={page} func={getAnswers} />
      </Row>
    </Container>
  );
};

export default QuestionPage;
