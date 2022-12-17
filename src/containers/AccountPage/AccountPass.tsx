import axios, { AxiosResponse } from "axios";
import Label from "components/Label/Label";
import useForm from "hooks/useForm";
import { UserContext } from "hooks/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";

const AccountPass = () => {
  const { user, setUser } = useContext(UserContext);
  
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const endpointGetAcompanhantes = "/acompanhantes-de-luxo/byanunciante";
  const endpointuser = "/utilizador";
  const endpointAcompanhante = "/acompanhantes-de-luxo";
  const changePasswordEndpoint = "/auth/changepassword";

  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    initialValues: {
      passwordAntiga: "",
      email: "",
      novapassword: "",
      novapasswordConfirm: "",
    },
  });

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    if (user) {
      //TODO anular endpoint , se tiver concelho nao puxar distrito, se tiver distrito e sem concelho, usar este endpoint, se nao tiver nada usar sem endpoint
      setuserEmail(user?.email);
      console.log('email: ' + user?.email)
    }
  }, [user]);

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    if (user) {
      //TODO anular endpoint , se tiver concelho nao puxar distrito, se tiver distrito e sem concelho, usar este endpoint, se nao tiver nada usar sem endpoint
      setuserEmail(user?.email);
      console.log('email: ' + user?.email)
    }
  }, [user, values]);

  const [messageChangePassword, setmessageChangePassword] = useState("teste L");
  const [userEmail, setuserEmail] = useState("");

  useEffect(() => {
    setmessageChangePassword("");
  }, [values]);

  const changeuserPassword = (values: any) => {
    console.log("sending");
    axios
      .post(
        urlbackend + changePasswordEndpoint,
        {
          password: values.passwordAntiga,
          email: userEmail,
          novapassword: values.novapassword,
          novapasswordConfirm: values.novapasswordConfirm,
        },
        { withCredentials: true }
      )
      .then((response: AxiosResponse<any>) => {
        setmessageChangePassword(response.data.message);
        navigate("/painel");
        //window.location.reload();
      })
      .catch((error) => {
        setmessageChangePassword(error.response.data);
      });
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    await changeuserPassword({
      passwordAntiga: values.passwordAntiga,
      email: userEmail,
      novapassword: values.novapassword,
      novapasswordConfirm: values.novapasswordConfirm,
    });
  };

  return (
    <div>
      <CommonLayout>
        <div className="container mb-24 lg:mb-32" 
        style={{ padding: "16px", marginTop: "10px" }}>
          {/* HEADING */}
          <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Alterar Password
          </h2>
          <div style={{ paddingTop: "12px" }}>
            <h2 className="flex items-center text-1xl leading-[115%] md:text-1xl md:leading-[115%]   justify-center subtexth2">
              Altere a sua password.
            </h2>
          </div>
          <div
            style={{ paddingTop: "16px" }}
            className="max-w-md mx-auto space-y-6"
          >
            <form
              className="grid grid-cols-1 gap-6"
              action="#"
              method="post"
              onSubmit={handleChangePassword}
            >
              <div>
                <Label>Password Atual</Label>
                <Input
                  placeholder="Escreva a sua password atual.."
                  type="password"
                  name={"passwordAntiga"}
                  className="mt-1.5"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Nova password</Label>
                <Input
                  placeholder="Escreva a nova password.."
                  type="password"
                  name={"novapassword"}
                  className="mt-1.5"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Confirm a nova password</Label>
                <Input
                  placeholder="Escreva novamente a nova password.."
                  type="password"
                  name={"novapasswordConfirm"}
                  className="mt-1.5"
                  onChange={handleChange}
                />
              </div>
              <ButtonPrimary type="submit">Atualizar password</ButtonPrimary>
              {messageChangePassword.length > 0 && (
                <div className="w-full">
                  <div className="flex place-content-center message">
                    {messageChangePassword ? (
                      <p>{messageChangePassword}</p>
                    ) : null}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPass;
