import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Alert,
  Button,
  Card,
  Media,
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

import styles from "./profile.module.css";
import { AuthContext } from "../../contexts/auth";
import User from "../user";

const Profile = () => {
  const [userInfo, setUserInfo] = useState();

  const { token, apiCall } = useContext(AuthContext);
  const history = useHistory();

  const infoSchema = yup.object({
    FirstName: yup.string(),
    LastName: yup.string(),
    Email: yup.string().required().email(),
    Password: yup.string().required().min(5),
  });

  const passwordSchema = yup.object({
    OldPassword: yup.string().required().min(5),
    NewPassword: yup.string().required().min(5),
  });

  const getUserInfo = async () => {
    const response = await apiCall("/account", "", "");
    const json = await response.json();

    if (response.ok) setUserInfo(json);
  };

  const updateUserInfo = async (
    { FirstName, LastName, Email, Password },
    { setStatus, resetForm }
  ) => {
    const response = await apiCall("/account", "", "", "PUT", {
      FirstName,
      LastName,
      Email,
      Password,
    });
    const json = await response.json();

    if (response.ok) {
      setUserInfo(json);
    } else {
      resetForm();
      setStatus(json.message);
    }
  };

  const updateUserPassword = async (
    { OldPassword, NewPassword },
    { setStatus, resetForm }
  ) => {
    const response = await apiCall("/account", "password", "", "PUT", {
      OldPassword,
      NewPassword,
    });
    const json = await response.json();

    if (response.ok) {
      history.go();
    } else {
      resetForm();
      setStatus(json.message);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [token]);

  return userInfo ? (
    <Container>
      <Row>
        <Col>
          <h4 className={styles.title}>Profile</h4>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg="7" md="8">
          <User
            firstname={userInfo.FirstName}
            lastname={userInfo.LastName}
            email={userInfo.Email}
            answers={userInfo.AnswerCount}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg="7" md="8">
          <Media className={styles.form}>
            <Media.Body>
              <Card>
                <Card.Header>
                  <Card.Text>Edit your info</Card.Text>
                </Card.Header>
                <Card.Body>
                  <Formik
                    initialValues={{
                      FirstName: userInfo.FirstName,
                      LastName: userInfo.LastName,
                      Email: userInfo.Email,
                      Password: "",
                    }}
                    onSubmit={updateUserInfo}
                    validationSchema={infoSchema}
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
                            value={values.Email}
                            onChange={handleChange}
                            isInvalid={touched.Email && errors.Email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Email}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Confirm password</Form.Label>
                          <Form.Control
                            id="Password"
                            name="Password"
                            type="password"
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
                          Save changes
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Media.Body>
          </Media>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg="7" md="8">
          <Media className={styles.form}>
            <Media.Body>
              <Card>
                <Card.Header>
                  <Card.Text>Change your password</Card.Text>
                </Card.Header>
                <Card.Body>
                  <Formik
                    initialValues={{ OldPassword: "", NewPassword: "" }}
                    onSubmit={updateUserPassword}
                    validationSchema={passwordSchema}
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
                          <Form.Label>Old password</Form.Label>
                          <Form.Control
                            id="OldPassword"
                            name="OldPassword"
                            type="password"
                            value={values.OldPassword}
                            onChange={handleChange}
                            isInvalid={
                              touched.OldPassword && errors.OldPassword
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.OldPassword}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>New password</Form.Label>
                          <Form.Control
                            id="NewPassword"
                            name="NewPassword"
                            type="password"
                            value={values.NewPassword}
                            onChange={handleChange}
                            isInvalid={
                              touched.NewPassword && errors.NewPassword
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.NewPassword}
                          </Form.Control.Feedback>
                        </Form.Group>

                        {status && <Alert variant="danger">{status}</Alert>}

                        <Button variant="primary" type="submit" block>
                          Change password
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Media.Body>
          </Media>
        </Col>
      </Row>
    </Container>
  ) : null;
};

export default Profile;
