import React from "react";
import { IUser } from "./interfaces/IUser";

export interface IProps {
  user: IUser;
}

const AppContext = React.createContext<IProps>({
  user: {},
});

export default AppContext;
