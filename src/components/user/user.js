import React from "react";
import { Media, Card } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

import styles from "./user.module.css";

const User = ({ firstname, lastname, email, answers }) => {
  return (
    <Media className={styles.user}>
      <Card style={{ width: "100%" }}>
        <Card.Header>
          <PersonCircle width={64} height={64} />
        </Card.Header>
        <Card.Body>
          <Card.Title>{firstname + " " + lastname}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
          <Card.Text>Answers submitted: {answers}</Card.Text>
        </Card.Body>
      </Card>
    </Media>
  );
};

export default User;
