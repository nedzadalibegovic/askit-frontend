import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import User from "../user";
import styles from "./top-users.module.css";
import { AuthContext } from "../../contexts/auth";

const TopUsers = () => {
  const [users, setUsers] = useState({});
  const { apiCall } = useContext(AuthContext);

  const getTopUsers = async () => {
    const response = await apiCall("/public", "top-users");
    const json = await response.json();

    if (response.ok) setUsers(json);
  };

  useEffect(() => {
    getTopUsers();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h4 className={styles.headerstyle}>Top Users</h4>
        </Col>
      </Row>
      <Row>
        {users.results &&
          users.results.map((user) => (
            <User
              key={user.UserID}
              firstname={user.FirstName}
              lastname={user.LastName}
              email={user.Email}
              answers={user.AnswerCount}
            />
          ))}
      </Row>
    </Container>
  );
};

export default TopUsers;
