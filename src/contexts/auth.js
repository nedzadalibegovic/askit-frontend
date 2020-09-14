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

  setInterval(() => {
    if (!token) getAccessToken();
  }, 890000); // every 14 minutes and 50 seconds

  useEffect(() => {
    if (!token) getAccessToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
