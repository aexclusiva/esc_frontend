import axios, { AxiosResponse } from "axios";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import Label from "components/Label/Label";
import FormItem from "containers/PageAddListing1/FormItem";
import { UserContext } from "hooks/UserContext";
import React, { useState, useContext, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Checkbox from "shared/Checkbox/Checkbox";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";

const OmeuAnuncio = () => {
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

  let atendimentosDisponiveiscalls = [
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

  const { user, setUser } = useContext(UserContext);
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const endpointGetAcompanhantes = "/acompanhantes-de-luxo/byanunciante";
  const endpointObterDistritos = "/localizacoes/distritos/";
  const endpointObterdoDistritoporSlug = "/localizacoes/concelhos/porslug/";

  const [distritos, setDistritos] = useState<string[]>([]);
  const [selectedDistrito, setSelectedDistrito] = useState("");
  const [selectedDistritoName, setSelectedDistritoName] = useState("");

  const [concelhos, setConcelhos] = useState([]);
  const [selectedConcelho, setSelectedConcelho] = useState("");
  const [selectedConcelhoName, setSelectedConcelhoName] = useState("");

  const [anuncio, setAnuncio] = useState<any>();
  const [nomeprofissional, setNomeProfissional] = useState<string>("");
  const [idade, setIdade] = useState(0);
  const [contactotelefonico, setContactoTelefonico] = useState("");
  const [paisdeOrigem, setPaisdeOrigem] = useState("");
  const [slug, setslug] = useState("");
  const [olhos, setOlhos] = useState("verdes");
  const [cabelo, setCabelo] = useState("moreno");
  const [idiomas, setIdiomas] = useState<string[]>([]);
  const [eventos, setEventos] = useState<string[]>([]);
  const [atendimentos, setAtendimentos] = useState<string[]>([]);
  const [viagemaconvite, setVuagemaConvite] = useState<string>("");
  const [insandOuts, setInOuts] = useState<string[]>([]);
  const [tipoAtendimento, setTipoAtendimento] = useState();
  const [webcam, setWebcam] = useState();
  const [horainicio, setHoraInicio] = useState("");
  const [horafim, setHoraFim] = useState("");

  const [descricaoAnuncio, setdescricaoAnuncio] = useState<string>("sim");
  const [diasatendimento, setdiasatendimento] = useState<string[]>([]);
  let typeofNaturalidade = [
    {
      name: "Angola",
      slug: "angola",
    },
    {
      name: "Argentina",
      slug: "argentina",
    },
    {
      name: "Brasil",
      slug: "brasil",
    },
    {
      name: "Cabo Verde",
      slug: "caboverde",
    },
    {
      name: "Colômbia",
      slug: "colombia",
    },
    {
      name: "Itália",
      slug: "italia",
    },
    {
      name: "Moçambique",
      slug: "mocambique",
    },
    {
      name: "Portugal",
      slug: "portugal",
    },
    {
      name: "Russia",
      description: "",
      slug: "russia",
      valueChecked: false,
    },
    {
      name: "Ucrânia",
      slug: "ucrania",
    },
    {
      name: "Venezuela",
      slug: "venezuela",
    },
  ];

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

  const handleDescricaoAnuncio = (event: any) => {
    console.log("descricao: 👉️", event.target.value);
    setdescricaoAnuncio(event.target.value);
  };

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    //SETs todos dos valores Default.
    console.log("Dados Atualizados.");
    setNomeProfissional(anuncio?.nomePerfil);
    setIdade(anuncio?.idade);
    setContactoTelefonico(anuncio?.contactoTelefonico);
    setPaisdeOrigem(anuncio?.paisdeorigem);
    setslug(anuncio?.slug);
    setOlhos(anuncio?.olhos);
    setCabelo(anuncio?.cabelo);
    setIdiomas(anuncio?.idiomas);
    setEventos(anuncio?.eventos);
    setAtendimentos(anuncio?.atendimento);
    setVuagemaConvite(anuncio?.viajaraconvite);
    setInOuts(anuncio?.tipodeatendimento);
    setSelectedDistrito(anuncio?.distrito);
    setSelectedConcelho(anuncio?.concelho);
    setTipoAtendimento(anuncio?.atendimentocompleto);
    setWebcam(anuncio?.webcam);
    setHoraInicio(anuncio?.horarioninicio);
    setHoraFim(anuncio?.horariofim);
    setdiasatendimento(anuncio?.diasatendimento);
    setdescricaoAnuncio(anuncio?.bio);
    console.log("Dados Fim.");
  }, [anuncio]);

  let dataPaisdeOrigem: any = "";
  if (typeofNaturalidade.length > 0) {
    let conteudo: any = "";
    dataPaisdeOrigem = (
      <>
        {typeofNaturalidade.map((pais: any, index) => {
          conteudo = (
            <option key={index} value={pais?.slug}>
              {pais?.name}
            </option>
          );
          return conteudo;
        })}
      </>
    );
  }
  const checkChangeAtendimento = (e: any) => {
    console.log("value completo:" + JSON.stringify(e.target.value));
    setTipoAtendimento(e.target.value);
  };

  const checkChangeWebcam = (e: any) => {
    console.log("value webcam:" + JSON.stringify(e.target.value));
    setWebcam(e.target.value);
  };

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

  const handleChangeSelectedDistrito = (event: any) => {
    console.log(
      "Label Selected Distrito: 👉️",
      event.target.selectedOptions[0].label
    );
    console.log("Valor Selected Distrito: 👉️", event.target.value);
    setSelectedDistrito(event.target.value);
    setSelectedDistritoName(event.target.selectedOptions[0].label);
  };
  const handleChangeHoradeInicio = (event: any) => {
    console.log("Hora Inicio: 👉️", event.target.value);
    setHoraInicio(event.target.value);
  };

  const handleChangeHoraFim = (event: any) => {
    console.log("Hora fim: 👉️", event.target.value);
    setHoraFim(event.target.value);
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
    axios
      .get(urlbackend + endpointObterDistritos)
      .then((response: AxiosResponse<any>) => {
        setDistritos(response.data);
      });
  }, []);

  //Obter Concelhos Distrito Selecionado
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (selectedDistrito && selectedDistrito.length > 1) {
  //       axios
  //         .get(urlbackend + endpointObterdoDistritoporSlug + selectedDistrito)
  //         .then((response: AxiosResponse<any>) => {
  //           setConcelhos(response.data);
  //         });
  //     }
  //   };
  //   fetchData();
  // }, [selectedDistrito]);

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

  const handleOutins = (key: string) => {
    let sel = atendimentos;
    let find = sel.indexOf(key);
    if (find > -1) {
      sel.splice(find, 1);
    } else {
      sel.push(key);
    }
    setInOuts(sel);
    console.log("OutsIns: 👉️:" + atendimentos);
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

  const handleviagemaconvite = (event: any) => {
    console.log("Viajem a Convite: 👉️", event.target.value);
    setVuagemaConvite(event.target.value);
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

  const checkChangeOlhos = (e: any) => {
    console.log("value olhos:" + JSON.stringify(e.target.value));
    setOlhos(e.target.value);
  };
  const checkChangeCabelo = (e: any) => {
    console.log("value cabelo:" + JSON.stringify(e.target.value));
    setCabelo(e.target.value);
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

  const handleAtendimentosCalls = (key: string) => {
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

  console.log("");
  return (
    <div>
      <CommonLayout>
        <>
          <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Editar Anúncio
          </h2>
          <div style={{ paddingTop: "12px", textAlign:'center' }}>
            <h2 className="flex items-center text-1xl leading-[115%] md:text-1xl md:leading-[115%] justify-center subtexth2">
              Poderá editar o seu anúncio.
            </h2>
            <h2
              style={{
                marginTop: "12px",
                marginBottom: "12px",
                color: "orange",
              }}
              className="flex items-center text-1xl leading-[115%] md:text-1xl md:leading-[115%]   justify-center subtexth2"
            >
              Ao alterar o anúncio, o mesmo terá que ser aprovado pela
              novamente.
            </h2>
          </div>
          <div className="space-y-6 sm:space-y-8 flex items-stretch grid justify-items-center">
            <div
              style={{ marginTop: "12px" }}
              className="w-14 border-b border-neutral-200 dark:border-neutral-700"
            />

            {/* FORM */}
            <div
              style={{ textAlign: "center" }}
              className="w-full max-w-6xl shadow-xl"
            >
              <h2 className="text-2xl font-semibold">O seu Anúncio:</h2>

              <div
                className="max-w-xs"
                style={{ margin: "0 auto", paddingTop: "22px" }}
              >
                {anuncio?._id && (
                  <ExperiencesCard key={anuncio._id} datapass={anuncio} />
                )}
              </div>
              <div
                className="w-full"
                style={{ margin: "0 auto", paddingTop: "22px" }}
              >
                <ButtonPrimary link={"/adicionaranuncio-1"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span className="ml-3">Editar Anúncio </span>
                </ButtonPrimary>
              </div>

              {!anuncio?.anuncioverificado && (
                <div
                  className="w-full"
                  style={{ margin: "0 auto", paddingTop: "22px" }}
                >
                  <ButtonPrimary
                    link={
                      "/acompanhantes-de-luxo/previsualizar/" + anuncio?.slug
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span className="ml-3">
                      Pre-visualizar Anúncio{" "}
                    </span>
                  </ButtonPrimary>
                </div>
              )}

              {anuncio?.anuncioverificado && (
                <div
                  className="w-full"
                  style={{ margin: "0 auto", paddingTop: "22px" }}
                >
                  <ButtonPrimary
                    link={
                      "/acompanhantes-de-luxo/" + anuncio?.slug
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span className="ml-3">
                      Ver Anúncio Completo{" "}
                    </span>
                  </ButtonPrimary>
                </div>
              )}
            </div>
          </div>
          {/*  */}
        </>
      </CommonLayout>
    </div>
  );
};

export default OmeuAnuncio;
