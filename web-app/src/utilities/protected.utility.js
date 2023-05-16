import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Protected = ({ children }) => {
  const user_data = localStorage.getItem("access_token");
  console.log(user_data);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user_data) {
      navigate("/login");
    }
  }, []);
  return children;
};
