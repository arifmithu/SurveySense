import React from "react";
import useAuth from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }
  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
