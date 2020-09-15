import React from "react";
import { Media, Card, Row, Col } from "react-bootstrap";

import Ratings from "../ratings";
import styles from "./answer.module.css";

const Answer = ({
  email,
  firstname,
  lastname,
  body,
  likes,
  dislikes,
  questionId,
  userId,
  ratings,
}) => {
  return (
    <Media className={styles.answer}>
      <Media.Body>
        <Card bg="dark" text="white">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              {firstname && lastname ? firstname + " " + lastname : email}
            </Card.Subtitle>
            <Card.Text>{body}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col className={styles.ratings}>
                <Ratings
                  likes={likes}
                  dislikes={dislikes}
                  questionId={questionId}
                  userId={userId}
                  type="answer"
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

export default Answer;
