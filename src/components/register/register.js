import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Alert, Col, Row, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import styles from "./register.module.css";

const Register = () => {
  const history = useHistory();

  const schema = yup.object({
    FirstName: yup.string(),
    LastName: yup.string(),
    Email: yup.string().required().email(),
    Password: yup.string().required().min(5),
  });

  const doRegister = async (
    { FirstName, LastName, Email, Password },
    { setStatus, resetForm }
  ) => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ FirstName, LastName, Email, Password }),
      credentials: "include",
    });
    const json = await response.json();

    if (response.ok) {
      history.push("/login");
    } else {
      resetForm();
      setStatus(json.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3 className={styles.title}>Register</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="7" lg="5">
          <Formik
            initialValues={{
              FirstName: "",
              LastName: "",
              Email: "",
              Password: "",
            }}
            onSubmit={doRegister}
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
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    id="FirstName"
                    name="FirstName"
                    type="text"
                    placeholder="John"
                    value={values.FirstName}
                    onChange={handleChange}
                    isInvalid={touched.FirstName && errors.FirstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.FirstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    id="LastName"
                    name="LastName"
                    type="text"
                    placeholder="Doe"
                    value={values.LastName}
                    onChange={handleChange}
                    isInvalid={touched.LastName && errors.LastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.LastName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    id="Email"
                    name="Email"
                    type="text"
                    placeholder="john.doe@example.com"
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
                    type="password"
                    placeholder="Correct Horse Battery Staple"
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
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
