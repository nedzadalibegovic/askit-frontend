import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");

  const getAccessToken = async () => {
    const response = await fetch("http://localhost:3000/token", {
      credentials: "include",
    });

    if (response.ok) {
      const { accessToken } = await response.json();
      setToken(accessToken);
    }
  };

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
