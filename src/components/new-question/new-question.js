import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Form,
  Alert,
  Button,
  Card,
  Container,
  Row,
  Col,
  Media,
} from "react-bootstrap";

import styles from "./new-question.module.css";

const NewQuestion = ({ submitFunc }) => {
  const schema = yup.object({
    Title: yup.string().required(),
    Body: yup.string(),
  });

  return (
    <Media className={styles.textbox}>
      <Media.Body>
        <Card>
          <Card.Body>
            <Container>
              <Row>
                <Col style={{ padding: "0px" }}>
                  <Formik
                    initialValues={{ Title: "", Body: "" }}
                    onSubmit={submitFunc}
                    validationSchema={schema}
                    initialStatus={""}
                  >
                    {({
                      handleChange,
                      handleSubmit,
                      values,
                      touched,
                      errors,
                      status,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group>
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            id="Title"
                            name="Title"
                            type="text"
                            value={values.Title}
                            onChange={handleChange}
                            isInvalid={touched.Title && errors.Title}
                            placeholder="What is the airspeed velocity of an unladen swallow?"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Title}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Body</Form.Label>
                          <Form.Control
                            as="textarea"
                            id="Body"
                            name="Body"
                            type="text"
                            value={values.Body}
                            onChange={handleChange}
                            isInvalid={touched.Body && errors.Body}
                            rows="3"
                            placeholder="What do you mean? African or European swallow?"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Body}
                          </Form.Control.Feedback>
                        </Form.Group>

                        {status && <Alert variant="danger">{status}</Alert>}

                        <Button variant="outline-dark" type="submit" block>
                          Ask question
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Media.Body>
    </Media>
  );
};

export default NewQuestion;
