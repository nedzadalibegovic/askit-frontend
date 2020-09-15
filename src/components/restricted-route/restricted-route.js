import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";

// RestrictedRoute is used to deny access to logged in users
const RestrictedRoute = ({ children, ...rest }) => {
  const { rejected } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        rejected === false ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default RestrictedRoute;
