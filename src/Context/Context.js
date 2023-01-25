import React from "react";
import { createContext, useState } from "react";

export const ContextProvider = createContext(null);

const Context = ({ children }) => {
  const [message1, setMessage1] = useState();

  return (
    <ContextProvider.Provider value={{ message1, setMessage1 }}>
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
