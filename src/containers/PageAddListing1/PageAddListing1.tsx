import axios, { AxiosResponse } from "axios";
import { UserContext } from "hooks/UserContext";
import React, { FC, useContext } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";

export interface PageAddListing1Props {}

const PageAddListing1: FC<PageAddListing1Props> = () => {
  const { user, setUser } = useContext(UserContext);
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const endpointGetAcompanhantes = "/acompanhantes-de-luxo";
  const endpointuser = "/utilizador";

  const createAdandBasic = () => {
    axios
      .post(urlbackend + endpointGetAcompanhantes, {
        slug: "start-form",
        email: user?.email,
        idanunciante: user?._id,
      })
      .then((response: AxiosResponse<any>) => {
        console.log("Response: " + JSON.stringify(response.data));
        console.log("UseEffect ok.");
      });
  };

  return (
    <CommonLayout
      index="00"
      backtHref="/"
      nextHref="/adicionaranuncio-1"
      onClick={async () => {
        console.log("fromparent");
        if (!user?.hasAnuncio) {
          await createAdandBasic();
        }
      }}
    >
      <>
        <h2 className="text-2xl font-semibold">Anunciar no X</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}{" "}
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Será necessário para o processo de validação:
        </span>
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <i
              className="las la-check-circle text-2xl"
              style={{ color: "green" }}
            ></i>
            <span>Ser Mulher</span>
          </div>

          <div className="flex items-center space-x-3">
            <i
              className="las la-check-circle text-2xl"
              style={{ color: "green" }}
            ></i>
            <span>Comprovar que tem +18 anos</span>
          </div>
          <div className="flex items-center space-x-3">
            <i
              className="las la-check-circle text-2xl"
              style={{ color: "green" }}
            ></i>
            <span>Autorizar a publicação das suas fotos no nosso site</span>
          </div>
          <div className="flex items-center space-x-3">
            <i
              className="las la-check-circle text-2xl"
              style={{ color: "yellow" }}
            ></i>
            <span>Fazer uma sessão de fotos com os nossos profissionais</span>
          </div>
        </div>
        {/* ITEM */}
      </>
    </CommonLayout>
  );
};

export default PageAddListing1;
