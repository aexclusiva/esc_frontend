import Select from "shared/Select/Select";
import axios, { AxiosResponse } from "axios";
import { UserContext } from "hooks/UserContext";
import React, { FC, useContext, useEffect } from "react";
import { useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Checkbox from "shared/Checkbox/Checkbox";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
export interface PageAddListingAtendimentoProps {}

let atendimentosDisponiveis = [
  {
    name: "Incalls",
    slug: "incalls",
  },
  {
    name: "Outcalls",
    slug: "outcalls",
  },
];

let diasdasemana = [
  {
    name: "Segunda-Feira",
    slug: "2f",
  },
  {
    name: "Terça-Feira",
    slug: "3f",
  },
  {
    name: "Quarta-Feira",
    slug: "4f",
  },
  {
    name: "Quinta-Feira",
    slug: "5f",
  },
  {
    name: "Sexta-Feira",
    slug: "6f",
  },
  {
    name: "Sábado",
    slug: "sabados",
  },
  {
    name: "Domingo",
    slug: "domingos",
  },
];

let servicosDisponiveis = [
  {
    name: "Fetiche",
    slug: "fetiche",
  },
  {
    name: "Massagens",
    slug: "massagens",
  },
  {
    name: "Stripper",
    slug: "stripper",
  },
  {
    name: "BDSM",
    slug: "bdsm",
  },
];

const PageAddListingAtendimento: FC<PageAddListingAtendimentoProps> = () => {
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

  function strCompare(str1, str2) {
    return str1 === str2;
  }

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

  const { user, setUser } = useContext(UserContext);
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const endpointGetAcompanhantes = "/acompanhantes-de-luxo/byanunciante";
  const endpointuser = "/utilizador";
  const endpointAcompanhante = "/acompanhantes-de-luxo";

  const [anuncio, setAnuncio] = useState<any>();

  const [insandOuts, setInOuts] = useState<string[]>([]);
  const [tipoAtendimento, setTipoAtendimento] = useState<string>("nao");
  const [webcam, setWebcam] = useState<string>("nao");
  const [horainicio, setHoraInicio] = useState("16:30");
  const [horafim, setHoraFim] = useState("02:00");
  const [diasatendimento, setdiasatendimento] = useState<string[]>([]);
  const [servicos, setServicos] = useState<string[]>([]);
  const [atende24h, setAtende24h] = useState<string>("");
  const [atende24hbool, setAtende24hbool] = useState<boolean>();
  const checkChangeAtendimento = (e: any) => {
    console.log("value completo:" + JSON.stringify(e.target.value));
    setTipoAtendimento(e.target.value);
  };

  const checkChangeWebcam = (e: any) => {
    console.log("value webcam:" + JSON.stringify(e.target.value));
    setWebcam(e.target.value);
  };

  useEffect(() => {
    let bool = false;
    if (atende24h === "sim") {
      setAtende24hbool(true);
    } else {
      setAtende24hbool(false);
    }
  }, [atende24h]);

  const renderRadioAtendimento = (
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
          onChange={checkChangeAtendimento}
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
    if (anuncio?.tipodeatendimento) {
      //TODO anular endpoint ,
      setInOuts(anuncio?.tipodeatendimento);
    }
    if (anuncio?.atendimentocompleto) {
      //TODO anular endpoint ,
      setTipoAtendimento(anuncio?.atendimentocompleto);
    }
    if (anuncio?.webcam) {
      //TODO anular endpoint ,
      setWebcam(anuncio?.webcam);
    }
    if (anuncio?.horarioninicio) {
      //TODO anular endpoint ,
      setHoraInicio(anuncio?.horarioninicio);
    }
    if (anuncio?.horariofim) {
      //TODO anular endpoint ,
      setHoraFim(anuncio?.horariofim);
    }
    if (anuncio?.diasatendimento) {
      //TODO anular endpoint ,
      setdiasatendimento(anuncio?.diasatendimento);
    }
    if (anuncio?.servicos) {
      setServicos(anuncio?.servicos);
    }
    if (anuncio?.atende24horas) {
      if (anuncio?.atende24horas === true ) {
        setAtende24h("sim");
        setAtende24hbool(true);
      } else {
        setAtende24h("nao");
        setAtende24hbool(false);
      }
    }
  }, [anuncio]);

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

  const updateAdCamposExtra = () => {
    if (anuncio?._id) {
      axios
        .put(urlbackend + endpointAcompanhante + "/" + anuncio._id, {
          tipodeatendimento: insandOuts,
          atendimentocompleto: tipoAtendimento,
          webcam: webcam,
          horarioninicio: horainicio,
          horariofim: horafim,
          diasatendimento: diasatendimento,
          servicos: servicos,
          atende24horas: atende24hbool,
        })
        .then((response: AxiosResponse<any>) => {
          console.log("Response: " + JSON.stringify(response.data));
          console.log("UseEffect ok.");
        });
    }
  };

  const handleDiasAtendimento = (key: string) => {
    let sel = diasatendimento;
    let find = sel.indexOf(key);
    if (find > -1) {
      sel.splice(find, 1);
    } else {
      sel.push(key);
    }
    setdiasatendimento(sel);
    console.log("Dias: 👉️:" + diasatendimento);
  };

  const handleatende24h = (event: any) => {
    console.log("Viajem a Convite: 👉️", event.target.value);
    setAtende24h(event.target.value);
  };

  const handleServicos = (key: string) => {
    let sel = servicos;
    let find = sel.indexOf(key);
    if (find > -1) {
      sel.splice(find, 1);
    } else {
      sel.push(key);
    }
    setServicos(sel);
    console.log("Servicos: 👉️:" + servicos);
  };

  const renderRadioWebcam = (
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
          onChange={checkChangeWebcam}
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

  const handleChangeHoradeInicio = (event: any) => {
    console.log("Hora Inicio: 👉️", event.target.value);
    setHoraInicio(event.target.value);
  };

  const handleChangeHoraFim = (event: any) => {
    console.log("Hora fim: 👉️", event.target.value);
    setHoraFim(event.target.value);
  };

  const handleAtendimentos = (key: string) => {
    let sel = insandOuts;
    let find = sel.indexOf(key);
    if (find > -1) {
      sel.splice(find, 1);
    } else {
      sel.push(key);
    }
    setInOuts(sel);
    console.log("Atendimentos: 👉️:" + insandOuts);
  };
  return (
    <CommonLayout
      index="06"
      backtHref="/adicionaranuncio-5"
      nextHref="/adicionaranuncio-7"
      onClick={async () => {
        console.log("fromparent");
        await updateAdCamposExtra();
      }}
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Atendimento </h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Atendimento:
            </label>

            {insandOuts.length >= 1 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {atendimentosDisponiveis.map(({ name, slug }, index) => (
                  <Checkbox
                    name={name}
                    key={name}
                    label={name}
                    defaultChecked={insandOuts.includes(slug) ? true : false}
                    onChange={() => handleAtendimentos(slug)}
                  />
                ))}
              </div>
            )}
            {insandOuts.length < 1 && (
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
              Atendimento Completo:
            </label>
            {tipoAtendimento.length > 1 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {renderRadioAtendimento(
                  "atendimento",
                  "sim",
                  "Sim",
                  strCompare(tipoAtendimento, "sim")
                )}
                {renderRadioAtendimento(
                  "atendimento",
                  "nao",
                  "Não",
                  strCompare(tipoAtendimento, "nao")
                )}
              </div>
            )}
          </div>

          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Disponivel por Webcam:
            </label>
            {webcam.length > 1 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {renderRadioWebcam(
                  "webcam",
                  "sim",
                  "Sim",
                  strCompare(webcam, "sim")
                )}
                {renderRadioWebcam(
                  "webcam",
                  "nao",
                  "Não",
                  strCompare(webcam, "nao")
                )}
              </div>
            )}
          </div>
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Horários e Disponibilidade:
            </label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
              <FormItem
                label="Hora de Inicio: "
                desc="Este nome será visivel na página do anúncio."
              >
                <Input
                  placeholder="16:00"
                  value={horainicio}
                  onChange={handleChangeHoradeInicio}
                />
              </FormItem>
              <FormItem
                label="Hora Fim: "
                desc="Este nome será visivel na página do anúncio."
              >
                <Input
                  placeholder="16:00"
                  value={horafim}
                  onChange={handleChangeHoraFim}
                />
              </FormItem>
            </div>
            {/* FORM */}

            <div style={{ marginTop: "12px" }}>
              <label className="text-lg font-semibold" htmlFor="">
                Atende 24 Horas:
              </label>
              <div></div>
              <Select
                onChange={handleatende24h}
                value={atende24h}
                defaultValue={atende24h}
              >
                <option value="sim"> Sim</option>
                <option value="nao">Não</option>
              </Select>
            </div>

            <div style={{ marginTop: "24px" }}>
              <label className="text-lg font-semibold" htmlFor="">
                Dias da Semana
              </label>
            </div>

            {diasatendimento.length >= 1 && (
              <div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {diasdasemana.map(({ name, slug }, index) => (
                    <Checkbox
                      name={name}
                      key={name}
                      label={name}
                      defaultChecked={
                        diasatendimento.includes(slug) ? true : false
                      }
                      onChange={() => handleDiasAtendimento(slug)}
                    />
                  ))}
                </div>
              </div>
            )}

            {diasatendimento.length < 1 && (
              <div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {diasdasemana.map(({ name, slug }, index) => (
                    <Checkbox
                      name={name}
                      key={name}
                      label={name}
                      defaultChecked={false}
                      onChange={() => handleDiasAtendimento(slug)}
                    />
                  ))}
                </div>
              </div>
            )}
            {/* FORM */}
            <div style={{ marginTop: "24px" }}>
              <label className="text-lg font-semibold" htmlFor="">
                Serviços
              </label>
            </div>

            {servicos.length >= 1 && (
              <div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {servicosDisponiveis.map(({ name, slug }, index) => (
                    <Checkbox
                      name={name}
                      key={name}
                      label={name}
                      defaultChecked={servicos.includes(slug) ? true : false}
                      onChange={() => handleServicos(slug)}
                    />
                  ))}
                </div>
              </div>
            )}

            {servicos.length < 1 && (
              <div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {servicosDisponiveis.map(({ name, slug }, index) => (
                    <Checkbox
                      name={name}
                      key={name}
                      label={name}
                      defaultChecked={false}
                      onChange={() => handleServicos(slug)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListingAtendimento;
