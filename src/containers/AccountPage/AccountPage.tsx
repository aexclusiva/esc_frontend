import Label from "components/Label/Label";
import React, { FC, useContext, useEffect, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { UserContext } from "hooks/UserContext";
import StatCards from "utils/MUI/StatCards";
import FormItem from "containers/PageAddListing1/FormItem";
import axios, { AxiosResponse } from "axios";
import Button from "shared/Button/Button";

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
  const { user, setUser } = useContext(UserContext);
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const endpointGetAcompanhantes = "/acompanhantes-de-luxo/byanunciante";
  const endpointObterDistritos = "/localizacoes/distritos/";
  const endpointAcompanhante = "/acompanhantes-de-luxo";
  const endpointObterdoDistritoporSlug = "/localizacoes/concelhos/porslug/";

  const [anuncio, setAnuncio] = useState<any>();
  const [onlineagoraStatus, setonlineagoraStatus] = useState<string>("");

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    if (user && user?.hasAnuncio)
      //TODO anular endpoint , se tiver concelho nao puxar distrito, se tiver distrito e sem concelho, usar este endpoint, se nao tiver nada usar sem endpoint
      axios
        .get(urlbackend + endpointGetAcompanhantes + "/" + user?._id)
        .then((response: AxiosResponse<any>) => {
          console.log("Response: " + JSON.stringify(response.data));
          setAnuncio(response.data);
          console.log("UseEffect ok.");
        });
  }, [user]);

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    //SETs todos dos valores Default.
    console.log("Dados Atualizados.");
    setonlineagoraStatus(anuncio?.onlineagora);
    console.log("Status Online: " + anuncio?.onlineagora);
    console.log("Dados Fim.");
  }, [anuncio]);

  const updateAt = () => {
    axios
      .put(urlbackend + endpointAcompanhante + "/" + anuncio._id, {
        onlineagora: onlineagoraStatus,
      })
      .then((response: AxiosResponse<any>) => {
        console.log("Response: " + JSON.stringify(response.data));
        console.log("UseEffect ok.");
      });
  };

  const changePossoatender = (e: any) => {
    console.log("value completo:" + JSON.stringify(e.target.value));
    setonlineagoraStatus(e.target.value);
  };
  
  const renderRadioAtendimento = (
    name: string,
    id: string,
    label: string,
    defaultChecked?: boolean
  ) => {
    return (
      <div
        className="w-40 flex items-center "
        style={{
          marginTop: "10px",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <input
          defaultChecked={defaultChecked}
          id={id + name}
          onChange={changePossoatender}
          name={name}
          value={id}
          type="radio"
          className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
        />
        <label
          htmlFor={id + name}
          className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      </div>
    );
  };

  return (
    <div className={`nc-AccountPage  ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account || Booking React Template</title>
      </Helmet>
      <CommonLayout>
        <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Painel de Controlo
        </h2>
        <div style={{ paddingTop: "12px" }}>
          <h2 className="flex items-center text-1xl leading-[115%] md:text-1xl md:leading-[115%]   justify-center subtexth2">
            Poderá analisar a sua estatística.
          </h2>
        </div>
        <div className="space-y-6 sm:space-y-8 flex items-stretch grid justify-items-center">
          <div
            style={{ marginTop: "12px" }}
            className="w-14 border-b border-neutral-200 dark:border-neutral-700"
          />
        </div>

        {user && user?.hasAnuncio && anuncio?.anuncioverificado && (
          <div
            style={{ padding: "34px" }}
            className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
              true
                ? "border-primary-500"
                : "border-neutral-100 dark:border-neutral-700"
            }`}
          >
            <div style={{ marginTop: "26px" }}>
              <h2 className="flex items-center text-1xl leading-[115%] md:text-2xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center ">
                Pode Atender Agora?
              </h2>
              {onlineagoraStatus && (
                <FormItem desc="Após ativar, o seu perfil estará como online na página dos anúncios.">
                  <div className="flex justify-center ">
                    {renderRadioAtendimento(
                      "possoatender",
                      "sim",
                      "Sim",
                      onlineagoraStatus === "sim"
                    )}
                    {renderRadioAtendimento(
                      "possoatender",
                      "nao",
                      "Não",
                      onlineagoraStatus === "nao"
                    )}
                  </div>
                </FormItem>
              )}

              <div
                className=""
                style={{ marginTop: "12px", textAlign: "center" }}
              >
                <ButtonPrimary onClick={() => updateAt()}>
                  Atualizar
                </ButtonPrimary>{" "}
              </div>
            </div>
          </div>
        )}
        {user && user?.hasAnuncio && anuncio?.anuncioverificado && (
          <div className="space-y-6 sm:space-y-8" style={{ marginTop: "44px" }}>
            {/* HEADING */}

            <h2 className="flex items-center text-1xl leading-[115%] md:text-2xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center ">
              Estatísticas do seu Anúncio
            </h2>
            <div className="space-y-6 sm:space-y-8 flex items-stretch grid justify-items-center">
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
            </div>
            <StatCards />
          </div>
        )}
        {!user?.hasAnuncio && (
          <div
            style={{ marginTop: "24px" }}
            className="space-y-6 sm:space-y-8 flex items-stretch grid justify-items-center"
          >
            <div
              style={{ padding: "34px" }}
              className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
                true
                  ? "border-primary-500"
                  : "border-neutral-100 dark:border-neutral-700"
              }`}
            >
              {/* HEADING */}
              <h3 className="flex items-center text-1xl leading-[115%] md:text-2xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                Ainda não criou um Anúncio.
              </h3>
              <div
                className="flex flex-col mt-auto"
                style={{ marginTop: "44px" }}
              >
                <ButtonPrimary link="/adicionaranuncio">
                  Criar Anúncio
                </ButtonPrimary>
              </div>
            </div>
          </div>
        )}
        {user?.hasAnuncio && !anuncio?.anuncioverificado && (
          <div
            style={{ marginTop: "44px" }}
            className="space-y-6 sm:space-y-8 flex items-stretch grid justify-items-center"
          >
            <div
              style={{ padding: "34px" }}
              className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
                true
                  ? "border-primary-500"
                  : "border-neutral-100 dark:border-neutral-700"
              }`}
            >
              {/* HEADING */}
              <h3 className="flex items-center text-1xl leading-[115%] md:text-2xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                O seu anúncio encontra-se em verificação.
              </h3>
              <div style={{ paddingTop: "12px" }}>
                <h2 className="flex items-center text-1xl leading-[115%] md:text-1xl md:leading-[115%]   justify-center subtexth2">
                  Irá ser contactada via SMS e E-mail quando for aprovado.
                </h2>
              </div>
              <div
                className="flex flex-col mt-auto"
                style={{ marginTop: "44px" }}
              >
                <ButtonPrimary link="/meuanuncio">
                  Ver o meu Anúncio
                </ButtonPrimary>
              </div>
            </div>
          </div>
        )}
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
