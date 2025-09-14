import { Navigate } from "react-router-dom";
import React from "react";
interface Props {
  children: React.ReactNode;
}


function PrivateRoute({ children }: Props) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
