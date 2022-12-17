import React, { FC, useState, useEffect } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import useForm from "hooks/useForm";
import axios, { AxiosResponse } from "axios";
import useAuth from "hooks/useAuth";

export interface PageLoginProps {
  className?: string;
}

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  // States for login

  // States for checking the errors registratrion
  const [submittedLogin, setSubmittedLogin] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [messageLogin, setMessageLogin] = useState("");

  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const loginRegisterEndpoint = "/auth/login";

  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setMessageLogin("");
  }, [values]);

  const { loginUser, error } = useAuth();

  useEffect(() => {
    setMessageLogin(error);
  }, [error]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setMessageLogin("");
    await loginUser(values);
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Área Reservada || Booking React Template</title>
      </Helmet>
      <div
        style={{ padding: "16px", marginTop: "60px" }}
        className="container mb-24 lg:mb-32"
      >
        <h2 className="w-full flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Área Reservada
        </h2>
        <div style={{ paddingTop: "12px" }}>
          <h2 className="flex items-center text-1xl leading-[115%] md:text-1xl md:leading-[115%]   justify-center subtexth2">
            Poderá gerir o seu anúncio após entrar na sua área.
          </h2>
        </div>
        <div
          style={{ paddingTop: "16px" }}
          className="max-w-md mx-auto space-y-6"
        >
          <div className="grid gap-3"></div>
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={handleLogin}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Endereço de Email
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                name={"email"}
                value={values.email}
                onChange={handleChange}
              />
            </label>
            <label
              className="block"
              style={{ marginBottom: "30px", marginTop: "20px" }}
            >
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forgot-pass" className="text-sm">
                  Esqueceu-se da password?
                </Link>
              </span>
              <Input
                type="password"
                className="mt-1"
                placeholder={"Password"}
                name={"password"}
                value={values.password}
                onChange={handleChange}
              />
            </label>
            <ButtonPrimary type="submit">Iniciar Sessão</ButtonPrimary>
            {messageLogin.length > 0 && (
              <div className="w-full">
                <div className="flex place-content-center message">
                  {messageLogin ? <p>{messageLogin}</p> : null}
                </div>
              </div>
            )}
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Ainda não possui uma conta? {` `}
          </span>
          <span style={{ marginTop: '-2px'}} className="block text-center text-neutral-700 dark:text-neutral-300">
            <Link className="extralink" to="/registo">
              Criar Conta
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
