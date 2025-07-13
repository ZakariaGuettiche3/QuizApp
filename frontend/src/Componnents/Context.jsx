import React, { useState, createContext } from "react";

export const Context = createContext();

export const MyProvider = ({ children }) => {
  const [topic, SetTopic] = useState("");

  return (
    <Context.Provider value={{ topic, SetTopic }}>{children}</Context.Provider>
  );
};
