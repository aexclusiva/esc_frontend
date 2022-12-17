import React, { Fragment, useState, useEffect, FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, Popover, Transition } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import convertNumbThousand from "utils/convertNumbThousand";
import Slider from "rc-slider";
import { Navigate, useSearchParams } from "react-router-dom";
import { set } from "lodash";

// DEMO DATA

export interface FilterSearchProps {
  onChangeFilters: (filters: any) => void;
}

let typeofAtendimento = [
  {
    name: "Disponiveis Agora",
    description: "Pode atender neste momento.",
    slug: "onlineagora",
    valueChecked: false,
  },
  {
    name: "Disponiveis por Webcam",
    description: "",
    slug: "webcam",
    valueChecked: false,
  },
];
let typeofIdade = [
  {
    name: "18",
    slug: "18",
    valueChecked: false,
  },
  {
    name: "19-24",
    description: "",
    slug: "19_24",
    valueChecked: false,
  },
  {
    name: "25-30",
    description: "",
    slug: "25_30",
    valueChecked: false,
  },
  {
    name: "+30",
    description: "",
    slug: "mais30",
    valueChecked: false,
  },
];

let typeofAltura = [
  {
    name: "1.50m - 1.60m",
    slug: "15_16",
    valueChecked: false,
  },
  {
    name: "1.60m - 1.70m",
    description: "",
    slug: "16_17",
    valueChecked: false,
  },
  {
    name: "1.70 - 1.80m",
    description: "",
    slug: "17_18",
    valueChecked: false,
  },
  {
    name: "+ 1.80m",
    description: "",
    slug: "mais18",
    valueChecked: false,
  },
];

let typeofCabelo = [
  {
    name: "Castanho",
    slug: "castanho",
    valueChecked: false,
  },
  {
    name: "Loiro",
    description: "",
    slug: "loiro",
    valueChecked: false,
  },
  {
    name: "Preto",
    description: "",
    slug: "preto",
    valueChecked: false,
  },
  {
    name: "Ruivo",
    description: "",
    slug: "ruivo",
    valueChecked: false,
  },
  {
    name: "Outro",
    description: "",
    slug: "outro",
    valueChecked: false,
  },
];
let typeofOlhos = [
  {
    name: "Azuis",
    slug: "azuis",
    valueChecked: false,
  },
  {
    name: "Verdes",
    description: "",
    slug: "verdes",
    valueChecked: false,
  },
  {
    name: "Castanhos",
    description: "",
    slug: "castanhos",
    valueChecked: false,
  },
  {
    name: "Outros",
    description: "",
    slug: "outros",
    valueChecked: false,
  },
];

let typeofNaturalidade = [
  {
    name: "Angola",
    slug: "angola",
    valueChecked: false,
  },
  {
    name: "Argentina",
    description: "",
    slug: "argentina",
    valueChecked: false,
  },
  {
    name: "Brasil",
    description: "",
    slug: "brasil",
    valueChecked: false,
  },
  {
    name: "Cabo Verde",
    description: "",
    slug: "caboverde",
    valueChecked: false,
  },
  {
    name: "Colômbia",
    description: "",
    slug: "colombia",
    valueChecked: false,
  },
  {
    name: "Itália",
    description: "",
    slug: "italia",
    valueChecked: false,
  },
  {
    name: "Moçambique",
    description: "",
    slug: "mocambique",
    valueChecked: false,
  },
  {
    name: "Portugal",
    description: "",
    slug: "portugal",
    valueChecked: false,
  },
  {
    name: "Russia",
    description: "",
    slug: "russia",
    valueChecked: false,
  },
  {
    name: "Ucrânia",
    description: "",
    slug: "ucrania",
    valueChecked: false,
  },
  {
    name: "Venezuela",
    description: "",
    slug: "venezuela",
    valueChecked: false,
  },
];

let typeOfAtendimentoLocal = [
  {
    name: "InCalls",
    slug: "incalls",
    valueChecked: false,
  },
  {
    name: "OutCalls",
    description: "",
    slug: "outcalls",
    valueChecked: false,
  },
  {
    name: "Todos",
    description: "",
    slug: "todos",
    valueChecked: false,
  },
];

const typeOfExpriences = [
  {
    name: "Disponiveis Agora",
    description: "Pode atender neste momento.",
  },
  {
    name: "Disponiveis por Webcam",
    description: "",
  },
];

const timeOfdays = [
  {
    name: "Morning",
    description: "Start before 12pm",
  },
  {
    name: "Afternoon",
    description: "Start after 12pm",
  },
  {
    name: "Evening",
    description: "Start after 5pm",
  },
];

//
const moreFilter1 = typeOfExpriences;
const moreFilter2 = timeOfdays;

export interface RadioProps {
  item: any;
  label?: string;
  slug?: string;
  className?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, valueBox: any) => void;
}

const RadioButoonsBox: FC<RadioProps> = ({
  item,
  label = "",
  slug = "testerandomslug",
  className = "",
  defaultChecked,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <input
        defaultChecked={item.valueChecked}
        id={item.slug}
        name="radioidade"
        type="radio"
        className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
        onChange={(e) => onChange && onChange(e.target.checked, item.slug)}
      />
      <label
        htmlFor="labelid1"
        className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        {item.name}
      </label>
    </div>
  );
};

const TabFilters: FC<FilterSearchProps> = ({ onChangeFilters }) => {
  //const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const distrito = params.get("distrito");
  const concelho = params.get("concelho");
  const onlineagora = params.get("onlineagora");
  const webcam = params.get("webcam");
  const idademin = params.get("minidade");
  const idademax = params.get("maxidade");
  const alturamin = params.get("minaltura");
  const alturamax = params.get("maxaltura");
  const cabelo = params.get("cabelo");
  const olhos = params.get("olhos");
  const origem = params.get("origem");
  const atendimento24horas = params.get("atende24horas");
  const atendimentocompleto = params.get("atendimentocompleto");
  const localatendimento = params.get("atendimento");

  const [disponivelagoraFilter, setDisponivelAgoraFilter] =
    useState(onlineagora);
  const [webcamFilter, setWebcamFilter] = useState(webcam);
  const [tipodecabeloFilter, setTipodecabeloFilter] = useState(cabelo);
  const [tipodeolhosFilter, setTipodeolhosFilter] = useState(olhos);
  const [tipodeOrigemFilter, settipodeOrigemFilter] = useState(origem);

  const [localAtendimentoFilter, setLocalAtendimentoFilter] =
    useState(localatendimento);

  const [idademinFilter, setIdadeMinFilter] = useState(idademin);
  const [idademaxFilter, setIdadeMaxFilter] = useState(idademax);
  const [alturaminFilter, setAlturaMinFilter] = useState(alturamin);
  const [alturamaxFilter, setAlturaMaxFilter] = useState(alturamax);

  const [filterurl, setfilterurl] = useState("");

  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  //
  const [isOnSale, setIsOnSale] = useState(true);
  const [isAtendimento24horas, setisAtendimento24horas] =
    useState<any>(atendimento24horas);
  const [isAtendimentoCompleto, setisAtendimentoCompleto] =
    useState<any>(atendimentocompleto);
  const [rangePrices, setRangePrices] = useState([0, 1000]);
  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  //Add Selected Options on page load
  useEffect(() => {
    const updateFilters = async () => {
      let temp = "?";
      setfilterurl("?");
      if (disponivelagoraFilter) {
        for (const obj of typeofAtendimento) {
          if (obj.slug === "onlineagora") {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (webcamFilter) {
        for (const obj of typeofAtendimento) {
          if (obj.slug === "webcam") {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (idademin && idademin === "18" && idademax === "18") {
        for (const obj of typeofIdade) {
          if (obj.slug === "18") {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (idademin && idademin === "18" && idademax === "18") {
        for (const obj of typeofIdade) {
          if (obj.slug === "18") {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (idademin && idademin === "19" && idademax === "24") {
        for (const obj of typeofIdade) {
          if (obj.slug === "19_24") {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (idademin && idademin === "25" && idademax === "30") {
        for (const obj of typeofIdade) {
          if (obj.slug === "25_30") {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (idademin && idademin === "30" && idademax === "100") {
        for (const obj of typeofIdade) {
          if (obj.slug === "mais30") {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (alturamin && alturamin === "15" && alturamax === "16") {
        for (const obj of typeofAltura) {
          if (obj.slug === "15_16") {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (alturamin && alturamin === "16" && alturamax === "17") {
        for (const obj of typeofAltura) {
          if (obj.slug === "16_17") {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (alturamin && alturamin === "17" && alturamax === "18") {
        for (const obj of typeofAltura) {
          if (obj.slug === "17_18") {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (alturamin && alturamin === "18" && alturamax === "100") {
        for (const obj of typeofAltura) {
          if (obj.slug === "mais18") {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (tipodecabeloFilter) {
        for (const obj of typeofCabelo) {
          if (obj.slug === tipodecabeloFilter) {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (tipodeolhosFilter) {
        for (const obj of typeofOlhos) {
          if (obj.slug === tipodeolhosFilter) {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (tipodeOrigemFilter) {
        for (const obj of typeofNaturalidade) {
          if (obj.slug === tipodeOrigemFilter) {
            obj.valueChecked = true;
            break;
          }
        }
      }
      if (localAtendimentoFilter) {
        for (const obj of typeOfAtendimentoLocal) {
          if (obj.slug === localAtendimentoFilter) {
            obj.valueChecked = true;
            break;
          }
        }
      }
    };
    updateFilters();
  }, [onlineagora, webcam, idademin, idademax, origem, localatendimento]);

  //Add Filters to URL
  useEffect(() => {
    const updateFilters = async () => {
      let temp = "?";
      setfilterurl("?");
      if (distrito) {
        temp = temp + "&" + "distrito=" + distrito;
      }
      if (concelho) {
        temp = temp + "&" + "concelho=" + concelho;
      }

      if (disponivelagoraFilter) {
        temp = temp + "&" + "onlineagora=" + "sim";
      }
      if (webcamFilter) {
        temp = temp + "&" + "webcam=" + "sim";
      }

      if (idademinFilter) {
        temp = temp + "&" + "minidade=" + idademinFilter;
      }

      if (idademaxFilter) {
        temp = temp + "&" + "maxidade=" + idademaxFilter;
      }

      if (alturaminFilter) {
        temp = temp + "&" + "minaltura=" + alturaminFilter;
      }

      if (alturamaxFilter) {
        temp = temp + "&" + "maxaltura=" + alturamaxFilter;
      }
      if (tipodecabeloFilter) {
        temp = temp + "&" + "cabelo=" + tipodecabeloFilter;
      }
      if (tipodeolhosFilter) {
        temp = temp + "&" + "olhos=" + tipodeolhosFilter;
      }
      if (tipodeOrigemFilter) {
        temp = temp + "&" + "paisdeorigem=" + tipodeOrigemFilter;
      }
      if (isAtendimento24horas) {
        temp = temp + "&" + "atende24horas=" + isAtendimento24horas;
      }
      if (isAtendimentoCompleto) {
        temp = temp + "&" + "atendcomp=" + isAtendimentoCompleto;
      }
      if (localAtendimentoFilter) {
        console.log("triggered");
        temp = temp + "&" + "atendimento=" + localAtendimentoFilter;
      }
      setfilterurl(temp);
      onChangeFilters(temp);
    };
    updateFilters();
  }, [
    disponivelagoraFilter,
    webcamFilter,
    idademinFilter,
    idademaxFilter,
    alturamaxFilter,
    alturaminFilter,
    tipodecabeloFilter,
    tipodeolhosFilter,
    tipodeOrigemFilter,
    localAtendimentoFilter,
    isAtendimento24horas,
    isAtendimentoCompleto,
  ]);

  const handleTipoAtendimentoChange = (e: any, slug: any) => {
    console.log("Triggered Option:" + slug + " Value: " + JSON.stringify(e));
    if (slug === "onlineagora") {
      setDisponivelAgoraFilter(e);
    }
    if (slug === "webcam") {
      setWebcamFilter(e);
    }
  };

  const handleLocaldeAtendimentoChange = (e: any, slug: any) => {
    console.log("Triggered Option:" + slug + " Value: " + JSON.stringify(e));
    if (slug === "incalls") {
      setLocalAtendimentoFilter(slug);
    }
    if (slug === "outcalls") {
      setLocalAtendimentoFilter(slug);
    }
    if (slug === "incalls+outcalls") {
      setLocalAtendimentoFilter(slug);
    } else {
      setLocalAtendimentoFilter("");
    }
  };

  const handleTipoCabeloChange = (e: any, slug: any) => {
    console.log("Triggered Option:" + slug + " Value: " + JSON.stringify(e));
    if (slug && e) {
      setTipodecabeloFilter(slug);
    }
  };
  const handleTipoOlhosChange = (e: any, slug: any) => {
    console.log("Triggered Option:" + slug + " Value: " + JSON.stringify(e));
    if (slug && e) {
      setTipodeolhosFilter(slug);
    }
  };

  const handleTipodeOrigem = (e: any, slug: any) => {
    console.log("Triggered Option:" + slug + " Value: " + JSON.stringify(e));
    if (slug && e) {
      settipodeOrigemFilter(slug);
    }
  };

  const handleLocalAtendimento = (e: any, slug: any) => {
    console.log("Triggered Option:" + slug + " Value: " + JSON.stringify(e));
    if (slug && e) {
      setLocalAtendimentoFilter(slug);
    }
  };

  const clearTipodeCabelo = () => {
    setTipodecabeloFilter("");
    setfilterurl("?");
    if (distrito) {
      navigate("/acompanhantes-de-luxo/" + "?&distrito=" + distrito);
    }
    if (distrito && concelho) {
      navigate(
        "/acompanhantes-de-luxo/" +
          "?&distrito=" +
          distrito +
          "&concelho=" +
          concelho
      );
    } else {
      navigate("/acompanhantes-de-luxo");
    }
    window.location.reload();
  };

  const clearTipoOlhos = () => {
    setTipodeolhosFilter("");
    setfilterurl("?");
    if (distrito) {
      navigate("/acompanhantes-de-luxo/" + "?&distrito=" + distrito);
    }
    if (distrito && concelho) {
      navigate(
        "/acompanhantes-de-luxo/" +
          "?&distrito=" +
          distrito +
          "&concelho=" +
          concelho
      );
    } else {
      navigate("/acompanhantes-de-luxo");
    }
    window.location.reload();
  };

  const handleTipoIdadeChange = (e: any, slug: any) => {
    console.log("Triggered Option:" + slug + " Value: " + JSON.stringify(e));
    setIdadeMinFilter("");
    setIdadeMaxFilter("");
    if (slug === "18" && e) {
      setIdadeMinFilter("18");
      setIdadeMaxFilter("18");
    }
    if (slug === "19_24" && e) {
      setIdadeMinFilter("19");
      setIdadeMaxFilter("24");
    }
    if (slug === "25_30" && e) {
      setIdadeMinFilter("25");
      setIdadeMaxFilter("30");
    }
    if (slug === "mais30" && e) {
      setIdadeMinFilter("30");
      setIdadeMaxFilter("100");
    }
  };

  const handleTipoAlturaChange = (e: any, slug: any) => {
    console.log("Triggered Option:" + slug + " Value: " + JSON.stringify(e));
    setAlturaMinFilter("");
    setAlturaMaxFilter("");
    if (slug === "15_16" && e) {
      setAlturaMinFilter("15");
      setAlturaMaxFilter("16");
    }
    if (slug === "16_17" && e) {
      setAlturaMinFilter("16");
      setAlturaMaxFilter("17");
    }
    if (slug === "17_18" && e) {
      setAlturaMinFilter("17");
      setAlturaMaxFilter("18");
    }
    if (slug === "mais18" && e) {
      setAlturaMinFilter("18");
      setAlturaMaxFilter("100");
    }
  };

  const clearTipodeAtendimento = () => {
    setDisponivelAgoraFilter("");
    setWebcamFilter("");
    setfilterurl("?");
    if (distrito) {
      navigate("/acompanhantes-de-luxo/" + "?&distrito=" + distrito);
    }
    if (distrito && concelho) {
      navigate(
        "/acompanhantes-de-luxo/" +
          "?&distrito=" +
          distrito +
          "&concelho=" +
          concelho
      );
    } else {
      navigate("/acompanhantes-de-luxo");
    }
    window.location.reload();
  };

  const applyTipodeAtendimento = () => {
    console.log("apply clicked");
    navigate(filterurl);
    window.location.reload();
  };

  const applyTipodeAtendimentoLocal = () => {
    console.log("apply clicked");
    navigate(filterurl);
    window.location.reload();
  };

  const clearTipodeOrigem = () => {
    settipodeOrigemFilter("");
    setfilterurl("?");
    if (distrito) {
      navigate("/acompanhantes-de-luxo/" + "?&distrito=" + distrito);
    }
    if (distrito && concelho) {
      navigate(
        "/acompanhantes-de-luxo/" +
          "?&distrito=" +
          distrito +
          "&concelho=" +
          concelho
      );
    } else {
      navigate("/acompanhantes-de-luxo");
    }
    window.location.reload();
  };

  const clearLocaldeAtendimento = () => {
    setLocalAtendimentoFilter("");
    setfilterurl("?");
    if (distrito) {
      navigate("/acompanhantes-de-luxo/" + "?&distrito=" + distrito);
    }
    if (distrito && concelho) {
      navigate(
        "/acompanhantes-de-luxo/" +
          "?&distrito=" +
          distrito +
          "&concelho=" +
          concelho
      );
    } else {
      navigate("/acompanhantes-de-luxo");
    }
    window.location.reload();
  };

  const applyTipodeOrigem = () => {
    console.log("apply clicked");
    navigate(filterurl);
    window.location.reload();
  };

  const applyTipodeCabelo = () => {
    console.log("apply clicked");
    navigate(filterurl);
    window.location.reload();
  };

  const applyTipodeOlhos = () => {
    console.log("apply clicked");
    navigate(filterurl);
    window.location.reload();
  };

  const clearTipodeIdade = () => {
    setIdadeMaxFilter("");
    setIdadeMinFilter("");
    setfilterurl("?");
    if (distrito) {
      navigate("/acompanhantes-de-luxo/" + "?&distrito=" + distrito);
    }
    if (distrito && concelho) {
      navigate(
        "/acompanhantes-de-luxo/" +
          "?&distrito=" +
          distrito +
          "&concelho=" +
          concelho
      );
    } else {
      navigate("/acompanhantes-de-luxo");
    }
    window.location.reload();
  };

  const applyTipodeIdade = () => {
    navigate(filterurl);
    window.location.reload();
  };

  const clearTipodeAltura = () => {
    setAlturaMinFilter("");
    setAlturaMaxFilter("");
    setfilterurl("?");
    if (distrito) {
      navigate("/acompanhantes-de-luxo/" + "?&distrito=" + distrito);
    }
    if (distrito && concelho) {
      navigate(
        "/acompanhantes-de-luxo/" +
          "?&distrito=" +
          distrito +
          "&concelho=" +
          concelho
      );
    } else {
      navigate("/acompanhantes-de-luxo");
    }
    window.location.reload();
  };

  const applyTipodeAltura = () => {
    navigate(filterurl);
    window.location.reload();
  };

  const renderXClear = () => {
    return (
      <span className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderTabsTipoAtendimento = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Atendimento</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeofAtendimento.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          slug={item.slug}
                          label={item.name}
                          defaultChecked={item.valueChecked}
                          subLabel={item.description}
                          onChange={(e, value) =>
                            handleTipoAtendimentoChange(e, value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        clearTipodeAtendimento();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Limpar
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();
                        applyTipodeAtendimento();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Aplicar
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsIdade = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Idade</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeofIdade.map((item) => (
                      <RadioButoonsBox
                        key={item.slug}
                        item={item}
                        defaultChecked={item.valueChecked}
                        onChange={(e, value) => handleTipoIdadeChange(e, value)}
                      />
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        clearTipodeIdade();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Limpar
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();
                        applyTipodeIdade();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Aplicar
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsDataAnuncio = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Data do Anúncio falta timestamps</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeOfExpriences.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          subLabel={item.description}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsAltura = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Altura</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeofAltura.map((item) => (
                      <RadioButoonsBox
                        key={item.slug}
                        item={item}
                        defaultChecked={item.valueChecked}
                        onChange={(e, value) =>
                          handleTipoAlturaChange(e, value)
                        }
                      />
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        clearTipodeAltura();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Limpar
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();
                        applyTipodeAltura();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Aplicar
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };
  const renderTabsCabelo = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Cabelo</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeofCabelo.map((item) => (
                      <div key={item.name} className="">
                        <RadioButoonsBox
                          key={item.slug}
                          item={item}
                          defaultChecked={item.valueChecked}
                          onChange={(e, value) =>
                            handleTipoCabeloChange(e, value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        clearTipodeCabelo();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Limpar
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();
                        applyTipodeCabelo();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Aplicar
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsOlhos = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Olhos</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeofOlhos.map((item) => (
                      <div key={item.name} className="">
                        <RadioButoonsBox
                          key={item.slug}
                          item={item}
                          defaultChecked={item.valueChecked}
                          onChange={(e, value) =>
                            handleTipoOlhosChange(e, value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        clearTipoOlhos();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Limpar
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();
                        applyTipodeOlhos();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Aplicar
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsNaturalidade = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Pais de Origem</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeofNaturalidade.map((item) => (
                      <div key={item.name} className="">
                        <RadioButoonsBox
                          key={item.slug}
                          item={item}
                          defaultChecked={item.valueChecked}
                          onChange={(e, value) => handleTipodeOrigem(e, value)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        clearTipodeOrigem();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Limpar
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();
                        applyTipodeOrigem();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Aplicar
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTab24horas = () => {
    return (
      <div
        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer transition-all ${
          isAtendimento24horas
            ? "border-primary-500 bg-primary-50 text-primary-700"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
        onClick={() => setisAtendimento24horas(!isAtendimento24horas)}
      >
        <span>Atendimento 24 Horas</span>
        {isAtendimento24horas && renderXClear()}
      </div>
    );
  };

  const renderTabAtendimentoCompleto = () => {
    return (
      <div
        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer transition-all ${
          isAtendimentoCompleto
            ? "border-primary-500 bg-primary-50 text-primary-700"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
        onClick={() => setisAtendimentoCompleto(!isAtendimentoCompleto)}
      >
        <span>Atendimento Completo</span>
        {isAtendimentoCompleto && renderXClear()}
      </div>
    );
  };
  const renderTabsLocalAtendimento = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Local</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeOfAtendimentoLocal.map((item) => (
                      <div key={item.name} className="">
                        <RadioButoonsBox
                          key={item.slug}
                          item={item}
                          defaultChecked={item.valueChecked}
                          onChange={(e, value) =>
                            handleLocalAtendimento(e, value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        clearLocaldeAtendimento();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Limpar
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();
                        applyTipodeAtendimentoLocal();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Aplicar
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsTimeOfDay = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Time of day</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900   border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {timeOfdays.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          subLabel={item.description}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsPriceRage = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none `}
            >
              <span>
                {`$${convertNumbThousand(
                  rangePrices[0]
                )} - $${convertNumbThousand(rangePrices[1])}`}{" "}
              </span>
              {renderXClear()}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium">Price per day</span>
                      <Slider
                        range
                        min={0}
                        max={2000}
                        defaultValue={[rangePrices[0], rangePrices[1]]}
                        allowCross={false}
                        onChange={(e) => setRangePrices(e as number[])}
                      />
                    </div>

                    <div className="flex justify-between space-x-5">
                      <div>
                        <label
                          htmlFor="minPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Min price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              $
                            </span>
                          </div>
                          <input
                            type="text"
                            name="minPrice"
                            disabled
                            id="minPrice"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={rangePrices[0]}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maxPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Max price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              $
                            </span>
                          </div>
                          <input
                            type="text"
                            disabled
                            name="maxPrice"
                            id="maxPrice"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={rangePrices[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabOnSale = () => {
    return (
      <div
        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer transition-all ${
          isOnSale
            ? "border-primary-500 bg-primary-50 text-primary-700"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
        onClick={() => setIsOnSale(!isOnSale)}
      >
        <span>On sale</span>
        {isOnSale && renderXClear()}
      </div>
    );
  };

  const renderMoreFilterItem = (
    data: {
      name: string;
      description?: string;
      defaultChecked?: boolean;
    }[]
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderTabMobileFilter = () => {
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilter}
        >
          <span>
            <span className="hidden sm:inline">Experiences</span> filters (3)
          </span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block py-8 px-2 h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Experiences filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-4 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Type of experiences
                        </h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(moreFilter1)}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Time of day</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(moreFilter2)}
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Range Prices</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Slider
                                className="text-red-400"
                                min={0}
                                max={2000}
                                defaultValue={[0, 1000]}
                                allowCross={false}
                                onChange={(e) => setRangePrices(e as number[])}
                              />
                            </div>

                            <div className="flex justify-between space-x-5">
                              <div>
                                <label
                                  htmlFor="minPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Min price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    disabled
                                    id="minPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangePrices[0]}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="maxPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Max price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    disabled
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangePrices[1]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={closeModalMoreFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={closeModalMoreFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <>
      <div className="flex lg:space-x-4">
        <div className="hidden lg:flex space-x-4">
          {renderTabsTipoAtendimento()}
          {renderTabsLocalAtendimento()}
          {/* {renderTabsDataAnuncio()} */}
          {renderTabsIdade()}
          {renderTabsAltura()}
          {renderTabsOlhos()}
          {renderTabsCabelo()}
          {renderTabsNaturalidade()}
          {renderTab24horas()}
          {renderTabAtendimentoCompleto()}
        </div>
        <div className="flex lg:hidden space-x-4">
          {renderTabMobileFilter()}
          {renderTabOnSale()}
        </div>
      </div>
    </>
  );
};

export default TabFilters;
