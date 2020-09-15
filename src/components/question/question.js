import React from "react";
import { Media, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Ratings from "../ratings";
import styles from "./question.module.css";

const Question = ({
  title,
  email,
  firstname,
  lastname,
  body,
  likes,
  dislikes,
  answers,
  questionId,
  showLink,
  ratings
}) => {
  return (
    <Media className={styles.question}>
      <Media.Body>
        <Card>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {firstname && lastname ? firstname + " " + lastname : email}
            </Card.Subtitle>
            <Card.Text>{body}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col>
                {showLink && (
                  <Link to={`/question/${questionId}`}>
                    View answers ({answers})
                  </Link>
                )}
              </Col>
              <Col className={styles.ratings}>
                <Ratings
                  likes={likes}
                  dislikes={dislikes}
                  questionId={questionId}
                  type={"question"}
                  ratings={ratings}
                />
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Media.Body>
    </Media>
  );
};

export default Question;
