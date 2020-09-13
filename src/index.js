import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepage from "./components/homepage";
import NavigationBar from "./components/navigation-bar";
import AuthContextProvider from "./contexts/auth";
import Login from "./components/login";
import QuestionPage from "./components/question-page";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <NavigationBar />
        <Switch>
          <Route component={Login} path="/login" exact />
          <Route component={QuestionPage} path="/question/:id" />
          <Route component={Homepage} path="/" />
        </Switch>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
