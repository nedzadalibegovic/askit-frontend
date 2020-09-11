import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import LatestQuestions from "../latest-questions";
import PopularQuestions from "../popular-questions";
import TopUsers from "../top-users";

function Homepage() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <LatestQuestions />
        </Col>
        <Col>
          <TopUsers />
        </Col>
        <Col>
          <PopularQuestions />
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
