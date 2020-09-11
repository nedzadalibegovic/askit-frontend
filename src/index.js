import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepage from "./components/homepage";
import NavigationBar from "./components/navigation-bar";
import AuthContextProvider from "./contexts/auth";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <NavigationBar />
        <Switch>
          <Route component={Homepage} path="/" />
        </Switch>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
