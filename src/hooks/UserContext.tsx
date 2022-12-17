import { createContext, Dispatch } from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  setUser: (() => undefined) as Dispatch<any>,
  isLoading: false,
};

export const UserContext = createContext(initialState);
