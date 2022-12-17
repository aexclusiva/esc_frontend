import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function useAuth() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");

  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;

  axios.defaults.withCredentials = true;

  //set user
  const setUserContext = async () => {
  
    console.log("triggered set");
    return await axios
      .get(urlbackend + "/user", { withCredentials: true })
      .then((res) => {
        setUser(res.data.currentUser);
        console.log("set user context");
      })
      .catch((err) => {
        console.log("error in setusercontext");
        console.log(err);
        setError(err.response.data);
        console.log("error in setusercontext");
      });
  };

  //register user
  const registerUser = async (data) => {
    setError("");
    const email = data?.email || "";
    const password = data?.password || "";
    const passwordConfirm = data?.passwordConfirm || "";

    console.log("aqui");

    return axios
      .post(
        urlbackend + `/auth/register`,
        {
          email,
          password,
          passwordConfirm,
        },
        { withCredentials: true }
      )
      .then(async () => {
        await setUserContext();
        console.log("aqui");
        navigate("/painel");
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  //login user
  const loginUser = async (data) => {
    setError("");
    const email = data?.email || "";
    const password = data?.password || "";
    return axios
      .post(
        urlbackend + `/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then(async () => {
        await setUserContext();
        navigate("/painel");
      })
      .catch((err) => {
        console.log("from auth register: " + err.response.data);
        setError(err.response.data);
      });
  };

  return {
    registerUser,
    loginUser,
    error,
  };
}
