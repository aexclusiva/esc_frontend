import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api";

export default function useLogout() {
  const navigate = useNavigate();

  const logoutUser = async () => {
    await api
      .get("auth/logout")
      .then((res) => {
        console.log(res);
        navigate("/");
        window.location.reload(false);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    logoutUser,
  };
}
