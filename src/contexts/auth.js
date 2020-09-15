import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [rejected, setRejected] = useState(false);

  const getAccessToken = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/token", {
      credentials: "include",
    });
    const { accessToken } = await response.json();

    if (response.ok) setToken(accessToken);
    if (response.status === 401) setRejected(true);
  };

  const logout = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/login", {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      setToken("");
      setRejected(true);
    }
  };

  const apiCall = async (
    path,
    param = "",
    query = "",
    method = "GET",
    body = null
  ) => {
    const url =
      process.env.REACT_APP_API_URL +
      path +
      "/" +
      param +
      (query ? "?" + query : "");

    return fetch(url, {
      method: method,
      ...(body && { body: JSON.stringify(body) }),
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  };

  setInterval(() => {
    if (!token) getAccessToken();
  }, 890000); // every 14 minutes and 50 seconds

  useEffect(() => {
    if (!token) getAccessToken();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, apiCall, logout, rejected, setRejected }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
