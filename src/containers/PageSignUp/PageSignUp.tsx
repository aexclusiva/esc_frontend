import React, { FC, useEffect, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "shared/Checkbox/Checkbox";
import useForm from "hooks/useForm";
import useAuth from "hooks/useAuth";
import axios, { AxiosResponse } from "axios";

export interface PageSignUpProps {
  className?: string;
}

const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
const authRegisterEndpoint = "/auth/register";

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  // States for registration

  const navigate = useNavigate();

  // States for checking the errors registratrion
  const [messageRegister, setMessageRegister] = useState("");



  const { values, handleChange } = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  useEffect(() => {
    setMessageRegister("");
  }, [values]);



  const { registerUser, error } = useAuth();



  useEffect(() => {
    setMessageRegister(error);
  }, [error]);

  const handleRegister = async (e) => {
     e.preventDefault();
     setMessageRegister("");
     let temp = await registerUser(values);
     console.log('Temp: ' + temp)
  }



  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Criar Conta || Booking React Template</title>
      </Helmet>
      <div style={{ padding: '16px' , marginTop: "60px" }} className="container mb-24 lg:mb-32">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Criar Conta
        </h2>
        <div style={{ paddingTop: "12px" }}>
          <h2 className="flex items-center text-1xl leading-[115%] md:text-1xl md:leading-[115%]   justify-center subtexth2">
            Após criar conta poderá submeter o seu anúncio.
          </h2>
        </div>
        <div
          style={{ paddingTop: "36px" }}
          className="max-w-md mx-auto space-y-6 "
        >
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={handleRegister}
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
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
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
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirmar Password
              </span>
              <Input
                type="password"
                className="mt-1"
                placeholder={"Repita a Password"}
                name={"passwordConfirm"}
                value={values.passwordConfirm}
                onChange={handleChange}
              />
            </label>
            <Checkbox
              name="Termos e"
              label="Aceito os Termos e Condições"
              required={true}
            ></Checkbox>
            <ButtonPrimary type="submit">Registar</ButtonPrimary>

            {messageRegister.length > 0 && (
              <div className="w-full">
                <div className="flex place-content-center message">
                  {messageRegister ? <p>{messageRegister}</p> : null}
                </div>
              </div>
            )}
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Já possui uma conta? {` `}
            <Link className="extralink" to="/entrar">
              Entrar
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
