import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");

  const getAccessToken = async () => {
    const response = await fetch("http://localhost:3000/token", {
      credentials: "include",
    });
    const { accessToken } = await response.json();

    if (response.ok) setToken(accessToken);
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
    <AuthContext.Provider value={{ token, setToken, apiCall }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
