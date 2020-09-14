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

import styles from "./textbox.module.css";

const TextBox = ({ submitFunc, body = "" }) => {
  const schema = yup.object({
    Body: yup.string().required(),
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
                    initialValues={{ Body: body }}
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
                          <Form.Control
                            as="textarea"
                            id="Body"
                            name="Body"
                            type="text"
                            value={values.Body}
                            onChange={handleChange}
                            isInvalid={touched.Body && errors.Body}
                            rows="3"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Body}
                          </Form.Control.Feedback>
                        </Form.Group>

                        {status && <Alert variant="danger">{status}</Alert>}

                        <Button variant="outline-dark" type="submit" block>
                          Post
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

export default TextBox;
