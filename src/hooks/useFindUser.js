import { useState, useEffect } from "react";
import axios from "axios";
import api from "../api";


export default function useFindUser() {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);

  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;

  useEffect(() => {
    const findUser = async () => {
      await axios
        .get(urlbackend + "/user", { withCredentials: true })
        .then((res) => {
          console.log("res: " + JSON.stringify(res));
          setUser(res.data.currentUser);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    findUser();
  }, []);

  return {
    user,
    setUser,
    isLoading,
  };
}
