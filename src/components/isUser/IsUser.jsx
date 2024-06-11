import React from "react";
import useRole from "../../Hooks/useRole";
import { useNavigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const { role } = useRole();
  const navigate = useNavigate();
  if (
    role == "user" ||
    role == "pro-user" ||
    role == "surveyos" ||
    role == "admin"
  )
    return <div>{children}</div>;
  else navigate("/login");
};

export default UserRoute;
