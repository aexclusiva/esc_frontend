import axios, { AxiosResponse } from "axios";
import { UserContext } from "hooks/UserContext";
import React, { FC, useContext, Component, useState, useEffect } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";

export interface PageAddListing1Props {}

const PageAddListingnovo: FC<PageAddListing1Props> = () => {
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const endpointObterDistritos = "/localizacoes/distritos/";
  const endpointObterdoDistritoporSlug = "/localizacoes/concelhos/porslug/";

  const endpointObterDistritoporSlug = "/localizacoes/distritos/";
  const endpointObterConcelhoporSlug = "/localizacoes/concelhos/";

  const [distritos, setDistritos] = useState<string[]>([]);
  const [selectedDistrito, setSelectedDistrito] = useState("");
  const [selectedDistritoName, setSelectedDistritoName] = useState("");

  const [concelhoSlugobject, setconcelhoSlubObject] = useState<any>();
  const [distritoSlugobject, setdistritoSlubObject] = useState<any>();

  const [concelhos, setConcelhos] = useState([]);
  const [selectedConcelho, setSelectedConcelho] = useState("");
  const [selectedConcelhoName, setSelectedConcelhoName] = useState("");

  const [locationFormated, setLocationFormated] = useState("");

  const endpointGetAcompanhantes = "/acompanhantes-de-luxo/byanunciante";
  const endpointAcompanhante = "/acompanhantes-de-luxo";
  const { user, setUser } = useContext(UserContext);
  const [anuncio, setAnuncio] = useState<any>();

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get(urlbackend + endpointObterDistritos)
      .then((response: AxiosResponse<any>) => {
        setDistritos(response.data);
      });
  }, []);

  //Obter Concelhos Distrito Selecionado
  useEffect(() => {
    const fetchData = async () => {
      if (selectedDistrito && selectedDistrito.length > 1) {
        axios
          .get(urlbackend + endpointObterdoDistritoporSlug + selectedDistrito)
          .then((response: AxiosResponse<any>) => {
            setConcelhos(response.data);
          });
      }
    };
    fetchData();
  }, [selectedDistrito]);

  const handleChangeSelectedDistrito = (event: any) => {
    console.log(
      "Label Selected Distrito: 👉️",
      event.target.selectedOptions[0].label
    );
    console.log("Valor Selected Distrito: 👉️", event.target.value);
    setSelectedDistrito(event.target.value);
    setSelectedDistritoName(event.target.selectedOptions[0].label);
  };

  const handleChangeSelectedConcelho = (event: any) => {
    console.log(
      "Label Selected Concelho: 👉️",
      event.target.selectedOptions[0].label
    );
    console.log("Valor Selected Concelho: 👉️", event.target.value);
    setSelectedConcelho(event.target.value);
    setSelectedConcelhoName(event.target.selectedOptions[0].label);
  };

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    if (user) {
      //TODO anular endpoint , se tiver concelho nao puxar distrito, se tiver distrito e sem concelho, usar este endpoint, se nao tiver nada usar sem endpoint
      axios
        .get(urlbackend + endpointGetAcompanhantes + "/" + user?._id)
        .then((response: AxiosResponse<any>) => {
          console.log("Response got ad: " + JSON.stringify(response.data));
          setAnuncio(response.data);
          console.log("UseEffect ok.");
        });
    }
  }, [user]);
  //obteranuncio
  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    if (anuncio?.distrito_slug) {
      //TODO anular endpoint ,
      setSelectedDistrito(anuncio?.distrito_slug);
    }
    if (anuncio?.concelho_slug) {
      //TODO anular endpoint ,
      setSelectedConcelho(anuncio?.concelho_slug);
    }
    if (anuncio?.concelho_name) {
      //TODO anular endpoint ,
      setSelectedConcelhoName(anuncio?.concelho_name);
    }
    if (anuncio?.distrito_name) {
      //TODO anular endpoint ,
      setSelectedDistritoName(anuncio?.distrito_name);
    }
  }, [anuncio]);



  const updateAdCamposExtra = () => {
    if (anuncio?._id) {
      axios
        .put(urlbackend + endpointAcompanhante + "/" + anuncio._id, {
          concelho_name: selectedConcelhoName,
          distrito_name: selectedDistritoName,
          distrito_slug: selectedDistrito,
          concelho_slug: selectedConcelho,
        })
        .then((response: AxiosResponse<any>) => {
          console.log("Response: " + JSON.stringify(response.data));
          console.log("UseEffect ok.");
        });
    }
  };

  let dataDistritos: any = "";
  if (distritos.length > 0) {
    let conteudo: any = "";
    dataDistritos = (
      <>
        {distritos.map((distrito: any, index) => {
          conteudo = (
            <option key={index} value={distrito?.slug_distrito}>
              {distrito?.nome_distrito}
            </option>
          );
          return conteudo;
        })}
      </>
    );
  }

  let dataConcelhos: any = "";
  if (concelhos.length > 0) {
    let conteudo: any = "";
    dataConcelhos = (
      <>
        {concelhos.map((concelho: any, index) => {
          conteudo = (
            <option key={index} value={concelho?.slug_concelho}>
              {concelho?.nome_concelho}
            </option>
          );
          return conteudo;
        })}
      </>
    );
  }

  return (
    <CommonLayout
      index="01"
      backtHref="/adicionaranuncio"
      nextHref="/adicionaranuncio-2"
      onClick={async () => {
        await updateAdCamposExtra();
        console.log("done");
      }}
    >
      <>
        <h2 className="text-2xl font-semibold">Localização</h2>
        {/* ITEM */}
        <FormItem label="Escolha um Distrito" desc="">
          <Select
            value={selectedDistrito}
            required
            onChange={handleChangeSelectedDistrito}
          >
            <option disabled={true} value="">
              Escolha um Distrito
            </option>
            {dataDistritos}
          </Select>
        </FormItem>
        <FormItem
          label="(Opcional) Escolha um Concelho"
          desc="O seu anúncio aparecerá sempre através do distrito, mas caso o utilizador filtre por concelho, o seu anúncio não será visival se não o tiver habilitado."
        >
          <Select
            value={selectedConcelho}
            onChange={handleChangeSelectedConcelho}
          >
            <option disabled={true} value="">
              Escolha um Concelho
            </option>
            {dataConcelhos}
          </Select>
        </FormItem>
      </>
    </CommonLayout>
  );
};

export default PageAddListingnovo;
