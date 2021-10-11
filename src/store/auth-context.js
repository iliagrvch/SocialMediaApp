import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userId: "",
  isLoggedIn: false,
  loginHandler: (token) => {},
  logoutHandler: () => {},
});

const calculateRemainingTime = (expTime) => {
  const currentTime = new Date().getTime();
  const adjExpTime = expTime.getTime();
  return adjExpTime - currentTime;
};

export const AuthContextProvider = (props) => {
  const storedToken = localStorage.getItem("token");
  const storedUserId = localStorage.getItem("userId");
  const initialUserId = storedUserId ? storedUserId : null;
  const initialToken = storedToken ? storedToken : null;
  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);
  const userIsLoggedIn = !!token;

  function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
  }

  function loginHandler(newToken, expTime, userIdToLog) {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", userIdToLog);
    setUserId(userIdToLog);
    setToken(newToken);

    const remainingTime = calculateRemainingTime(expTime);
    // setTimeout(logoutHandler, remainingTime);
  }

  const contextValue = {
    token: token,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
