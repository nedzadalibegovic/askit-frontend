import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepage from "./components/homepage";
import NavigationBar from "./components/navigation-bar";
import AuthContextProvider from "./contexts/auth";
import Login from "./components/login";
import MyQuestions from "./components/my-questions";
import QuestionPage from "./components/question-page";
import Register from "./components/register";
import Profile from "./components/profile";
import PrivateRoute from "./components/private-route";
import RestrictedRoute from "./components/restricted-route";
import NotifcationHandler from "./components/notification-handler";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <NotifcationHandler />
        <NavigationBar />
        <Switch>
          <RestrictedRoute path="/register" exact>
            <Register />
          </RestrictedRoute>
          <RestrictedRoute path="/login" exact>
            <Login />
          </RestrictedRoute>
          <PrivateRoute path="/my-questions" exact>
            <MyQuestions />
          </PrivateRoute>
          <Route component={QuestionPage} path="/question/:id" exact />
          <PrivateRoute path="/profile" exact>
            <Profile />
          </PrivateRoute>
          <Route component={Homepage} path="/" />
        </Switch>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
