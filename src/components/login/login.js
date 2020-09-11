import React, { useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Alert, Col, Row, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";
import styles from "./login.module.css";

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const history = useHistory();

  const schema = yup.object({
    Email: yup.string().required().email(),
    Password: yup.string().required().min(5),
  });

  const doLogin = async ({ Email, Password }, { setStatus, resetForm }) => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email, Password }),
      credentials: "include",
    });
    const json = await response.json();

    if (response.ok) {
      // refreshToken should be automatically saved to browser as a cookie
      setToken(json.accessToken);
      history.push("/");
    } else {
      resetForm();
      setStatus(json.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3 className={styles.title}>Login</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="7" lg="5">
          <Formik
            initialValues={{ Email: "", Password: "" }}
            onSubmit={doLogin}
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
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    id="Email"
                    name="Email"
                    type="text"
                    placeholder="Email"
                    value={values.Email}
                    onChange={handleChange}
                    isInvalid={touched.Email && errors.Email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    id="Password"
                    name="Password"
                    type="Password"
                    placeholder="Password"
                    value={values.Password}
                    onChange={handleChange}
                    isInvalid={touched.Password && errors.Password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Password}
                  </Form.Control.Feedback>
                </Form.Group>

                {status && <Alert variant="danger">{status}</Alert>}

                <Button variant="primary" type="submit" block>
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
