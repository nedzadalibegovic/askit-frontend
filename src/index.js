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

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <NavigationBar />
        <Switch>
          <Route component={Register} path="/register" exact />
          <Route component={Login} path="/login" exact />
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
