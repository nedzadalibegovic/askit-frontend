import React, { useContext, useState } from "react";
import { Media, Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";
import Ratings from "../ratings";
import TextBox from "../textbox";
import styles from "./my-answer.module.css";

const MyAnswer = ({ body, likes, dislikes, questionId }) => {
  const { token, apiCall } = useContext(AuthContext);
  const history = useHistory();

  const [editing, setEditing] = useState(false);

  const editAnswer = async ({ Body }) => {
    const response = await apiCall("/answers", "", "", "PUT", {
      QuestionID: questionId,
      Body: Body,
    });

    if (response.ok) history.go();
  };

  const deleteAnswer = async () => {
    const response = await apiCall("/answers", questionId, "", "DELETE");

    if (response.ok) history.go();
  };

  return (
    <Media className={styles.answer}>
      <Media.Body>
        <Card bg="info" text="white">
          <Card.Body>
            <Card.Subtitle className="mb-2">Your answer</Card.Subtitle>
            {editing ? (
              <TextBox submitFunc={editAnswer} body={body} />
            ) : (
              <Card.Text>{body}</Card.Text>
            )}
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col>
                <Card.Link
                  className="text-light"
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditing(!editing)}
                >
                  {editing ? "Cancel" : "Edit"}
                </Card.Link>
                <Card.Link
                  onClick={deleteAnswer}
                  className="text-light"
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </Card.Link>
              </Col>
              <Col className={styles.ratings}>
                <Ratings likes={likes} dislikes={dislikes} />
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Media.Body>
    </Media>
  );
};

export default MyAnswer;
