import React from "react";
import { Navigate } from "react-router";
import Body from "./Body";
const Protected = ({ children, user }) => {
  console.log(children);
  return user ? children : <Navigate to={"/"}></Navigate>;
};

export default Protected;
