import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";

const AppProvider: React.FC = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
  }, []);

  return (
    <AppContext.Provider value={{ user }}>{props.children}</AppContext.Provider>
  );
};

export default AppProvider;
