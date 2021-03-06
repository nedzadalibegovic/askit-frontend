import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";

// PrivateRoute is used to deny access for anonymous/public users
const PrivateRoute = ({ children, ...rest }) => {
  const { rejected } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        rejected === true ? (
          <Redirect
            to={{
              pathname: "/login",
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

export default PrivateRoute;
