import axios, { AxiosResponse } from "axios";
import { UserContext } from "hooks/UserContext";
import React, { FC, useContext, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Checkbox from "shared/Checkbox/Checkbox";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";

export interface PageAddListing5Props {}
let idiomasdisponiveis = [
  {
    name: "Português",
    slug: "portugues",
  },
  {
    name: "Brasileiro",
    slug: "brasileiro",
  },
  {
    name: "Inglês",
    slug: "ingles",
  },
  {
    name: "Espanhol",
    slug: "espanhol",
  },
  {
    name: "Italiano",
    slug: "italiano",
  },
  {
    name: "Francês",
    slug: "frances",
  },
  {
    name: "Russo",
    slug: "russo",
  },
];

let eventosdisponiveis = [
  {
    name: "Festas",
    slug: "festas",
  },
  {
    name: "Congressos",
    slug: "congressos",
  },
  {
    name: "Viagens",
    slug: "viagens",
  },
  {
    name: "Despedidas de Solteiro",
    slug: "despedidasdesolteiro",
  },
  {
    name: "Clubes de Swing",
    slug: "clubesdeswing",
  },
  {
    name: "Noites",
    slug: "noites",
  },
  {
    name: "Jantares",
    slug: "jantares",
  },
  {
    name: "Fins-de-Semana",
    slug: "finsdesemana",
  },
];

let atendimentosDisponiveis = [
  {
    name: "Homens",
    slug: "homens",
  },
  {
    name: "Mulheres",
    slug: "mulheres",
  },
  {
    name: "Casais",
    slug: "casais",
  },
];

const PageAddListing5: FC<PageAddListing5Props> = () => {
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const endpointGetAcompanhantes = "/acompanhantes-de-luxo/byanunciante";
  const endpointuser = "/utilizador";
  const endpointAcompanhante = "/acompanhantes-de-luxo";
  const [olhos, setOlhos] = useState("castanhos");
  const [cabelo, setCabelo] = useState("moreno");
  const [altura, setAltura] = useState<string>("");
  const [tatuagem, setTatuagens] = useState("nao");
  const [viagemaconvite, setVuagemaConvite] = useState<string>("sim");
  const [peso, setPeso] = useState<string>("");

  const [anuncio, setAnuncio] = useState<any>();
  const [idiomas, setIdiomas] = useState<string[]>([]);
  const [eventos, setEventos] = useState<string[]>([]);
  const [atendimentos, setAtendimentos] = useState<string[]>([]);

  const { user, setUser } = useContext(UserContext);

  const checkChangeOlhos = (e: any) => {
    console.log("value olhos:" + JSON.stringify(e.target.value));
    setOlhos(e.target.value);
  };
  const checkChangeCabelo = (e: any) => {
    console.log("value cabelo:" + JSON.stringify(e.target.value));
    setCabelo(e.target.value);
  };

  const renderRadioOlhos = (
    name: string,
    id: string,
    label: string,
    defaultChecked?: boolean
  ) => {
    return (
      <div className="flex items-center">
        <input
          defaultChecked={defaultChecked}
          id={id + name}
          onChange={checkChangeOlhos}
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

  const renderRadioCabelo = (
    name: string,
    id: string,
    label: string,
    defaultChecked?: boolean
  ) => {
    return (
      <div className="flex items-center">
        <input
          defaultChecked={defaultChecked}
          id={id + name}
          onChange={checkChangeCabelo}
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

  const renderRadio = (
    name: string,
    id: string,
    label: string,
    defaultChecked?: boolean
  ) => {
    return (
      <div className="flex items-center">
        <input
          defaultChecked={defaultChecked}
          id={id + name}
          name={name}
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
  const renderNoInclude = (text: string) => {
    return (
      <div className="flex items-center justify-between py-3">
        <span className="text-neutral-6000 dark:text-neutral-400 font-medium">
          {text}
        </span>
        <i className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"></i>
      </div>
    );
  };

  const handlePeso = (event: any) => {
    console.log("peso: 👉️", event.target.value);
    setPeso(event.target.value);
  };
  const handleAltura = (event: any) => {
    console.log("altura: 👉️", event.target.value);
    setAltura(event.target.value);
  };

  const handleTatuagens = (event: any) => {
    console.log("Tatuagem: 👉️", event.target.value);
    setTatuagens(event.target.value);
  };

  const handleviagemaconvite = (event: any) => {
    console.log("Viajem a Convite: 👉️", event.target.value);
    setVuagemaConvite(event.target.value);
  };
  const handleIdiomas = (key: string) => {
    let sel = idiomas;
    let find = sel.indexOf(key);
    if (find > -1) {
      sel.splice(find, 1);
    } else {
      sel.push(key);
    }
    setIdiomas(sel);
    console.log("Idiomas: 👉️:" + idiomas);
  };

  const handleEventos = (key: string) => {
    let sel = eventos;
    let find = sel.indexOf(key);
    if (find > -1) {
      sel.splice(find, 1);
    } else {
      sel.push(key);
    }
    setEventos(sel);
    console.log("Eventos: 👉️:" + eventos);
  };
  const handleAtendimentos = (key: string) => {
    let sel = atendimentos;
    let find = sel.indexOf(key);
    if (find > -1) {
      sel.splice(find, 1);
    } else {
      sel.push(key);
    }
    setAtendimentos(sel);
    console.log("Atendimentos: 👉️:" + atendimentos);
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

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    if (anuncio?.olhos) {
      //TODO anular endpoint ,
      setOlhos(anuncio?.olhos);
    }
    if (anuncio?.cabelo) {
      //TODO anular endpoint ,
      setCabelo(anuncio?.cabelo);
    }
    if (anuncio?.altura) {
      //TODO anular endpoint ,
      setAltura(anuncio?.altura);
    }
    if (anuncio?.peso) {
      //TODO anular endpoint ,
      setPeso(anuncio?.peso);
    }
    if (anuncio?.viajaraconvite) {
      //TODO anular endpoint ,
      setVuagemaConvite(anuncio?.viajaraconvite);
    }
    if (anuncio?.tatuagens) {
      //TODO anular endpoint ,
      setTatuagens(anuncio?.tatuagens);
    }
    if (anuncio?.idiomas) {
      setIdiomas(anuncio?.idiomas);
    }
    if (anuncio?.eventos) {
      setEventos(anuncio?.eventos);
    }
    if (anuncio?.atendimento) {
      setAtendimentos(anuncio?.atendimento);
    }
  }, [anuncio]);

  const updateUserIdAnuncio = () => {
    axios
      .put(urlbackend + endpointuser + "/" + user._id, {
        idanuncio: anuncio._id,
      })
      .then((response: AxiosResponse<any>) => {
        console.log("Response: " + JSON.stringify(response.data));
        console.log("UseEffect ok.");
      });
  };

  const updateAdCamposExtra = () => {
    axios
      .put(urlbackend + endpointAcompanhante + "/" + anuncio._id, {
        olhos: olhos,
        cabelo: cabelo,
        altura: altura,
        tatuagens: tatuagem,
        viajaraconvite: viagemaconvite,
        peso: peso,
        idiomas: idiomas,
        eventos: eventos,
        atendimento: atendimentos,
      })
      .then((response: AxiosResponse<any>) => {
        console.log("Response: " + JSON.stringify(response.data));
        console.log("UseEffect ok.");
      });
  };

  //Encontrar o Anuncio através do user ID.
  //Alterar Anúncio
  //Gravr ID de Anúncio
  return (
    <CommonLayout
      index="03"
      backtHref="/adicionaranuncio-2"
      nextHref="/adicionaranuncio-4"
      onClick={async () => {
        console.log("fromparent");
        await updateUserIdAnuncio();
        await updateAdCamposExtra();
      }}
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">
            Caracteristicas do Anúncio{" "}
          </h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Olhos:
            </label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderRadioOlhos(
                "olhos",
                "castanhos",
                "Castanhos",
                olhos === "castanhos"
              )}
              {renderRadioOlhos("olhos", "azuis", "Azuis", olhos === "azuis")}
              {renderRadioOlhos(
                "olhos",
                "verdes",
                "Verdes",
                olhos === "verdes"
              )}
              {renderRadioOlhos(
                "olhos",
                "outros",
                "Outros",
                olhos === "outros"
              )}
            </div>
          </div>

          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Cabelo:
            </label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderRadioCabelo(
                "cabelo",
                "loiro",
                "Loiro",
                cabelo === "loiro"
              )}
              {renderRadioCabelo(
                "cabelo",
                "moreno",
                "Moreno",
                cabelo === "moreno"
              )}
              {renderRadioCabelo(
                "cabelo",
                "ruivo",
                "Ruivo",
                cabelo === "ruivo"
              )}
              {renderRadioCabelo(
                "cabelo",
                "outros",
                "Outros",
                cabelo === "outros"
              )}
            </div>
          </div>

          {/* ITEM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
            <FormItem label="Altura" desc="teste">
              <Input
                onChange={handleAltura}
                placeholder="1.69"
                value={altura}
              />
            </FormItem>
            <FormItem label="Peso" desc="teste">
              <Input onChange={handlePeso} placeholder="56" value={peso} />
            </FormItem>
            <FormItem label="Tatuagens" desc="teste">
              <Select
                onChange={handleTatuagens}
                value={tatuagem}
                defaultValue={tatuagem}
              >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </Select>
            </FormItem>
          </div>

          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Idiomas
            </label>
            {idiomas.length >= 1 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {idiomasdisponiveis.map(({ name, slug }, index) => (
                  <Checkbox
                    name={name}
                    key={name}
                    label={name}
                    defaultChecked={idiomas.includes(slug) ? true : false}
                    onChange={() => handleIdiomas(slug)}
                  />
                ))}
              </div>
            )}
            {idiomas.length < 1 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {idiomasdisponiveis.map(({ name, slug }, index) => (
                  <Checkbox
                    name={name}
                    key={name}
                    label={name}
                    defaultChecked={false}
                    onChange={() => handleIdiomas(slug)}
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Eventos
            </label>
            {eventos.length >= 1 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {eventosdisponiveis.map(({ name, slug }, index) => (
                  <Checkbox
                    name={name}
                    key={name}
                    label={name}
                    defaultChecked={eventos.includes(slug) ? true : false}
                    onChange={() => handleEventos(slug)}
                  />
                ))}
              </div>
            )}
            {eventos.length < 1 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {eventosdisponiveis.map(({ name, slug }, index) => (
                  <Checkbox
                    name={name}
                    key={name}
                    label={name}
                    defaultChecked={false}
                    onChange={() => handleEventos(slug)}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Atende a:
            </label>

            {atendimentos.length >= 1 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {atendimentosDisponiveis.map(({ name, slug }, index) => (
                  <Checkbox
                    name={name}
                    key={name}
                    label={name}
                    defaultChecked={atendimentos.includes(slug) ? true : false}
                    onChange={() => handleAtendimentos(slug)}
                  />
                ))}
              </div>
            )}
            {atendimentos.length < 1 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {atendimentosDisponiveis.map(({ name, slug }, index) => (
                  <Checkbox
                    name={name}
                    key={name}
                    label={name}
                    defaultChecked={false}
                    onChange={() => handleAtendimentos(slug)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Viajem a Convite:
            </label>
            <div></div>
            <Select
              onChange={handleviagemaconvite}
              value={viagemaconvite}
              defaultValue={viagemaconvite}
            >
              <option value="sim"> Sim</option>
              <option value="nao">Não</option>
            </Select>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing5;
