import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  localStorage.removeItem("access_token");
  return navigate("/login", { replace: true });
};

export default Logout;
