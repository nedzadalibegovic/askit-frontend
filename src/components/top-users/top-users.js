import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import User from "../user/user";

const TopUsers = () => {
  const [users, setUsers] = useState({});

  const getTopUsers = async () => {
    const response = await fetch("http://localhost:3000/users/top");
    const json = await response.json();

    setUsers(json);
  };

  useEffect(() => {
    getTopUsers();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h4 style={{ textAlign: "center" }}>Top Users</h4>
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
