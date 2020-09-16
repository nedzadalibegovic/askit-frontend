import React, { useContext, useEffect } from "react";
import io from "socket.io-client";
import jwtdecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { AuthContext } from "../../contexts/auth";

const Notification = ({ QuestionID }) => {
  return (
    <Container>
      <Link to={"/question/" + QuestionID}>New answer, check it out!</Link>;
    </Container>
  );
};

const NotifcationHandler = () => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      const { UserID } = jwtdecode(token);
      const socket = io(process.env.REACT_APP_API_URL);

      socket.on("connect", () => {
        socket.emit("join", UserID);
      });

      socket.on("notification", (msg) => {
        toast(<Notification QuestionID={msg.QuestionID} />);
      });
    }
  }, [token]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default NotifcationHandler;
