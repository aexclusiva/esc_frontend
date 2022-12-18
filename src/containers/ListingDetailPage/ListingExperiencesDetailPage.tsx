import React, { FC, useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import GuestsInput from "components/HeroSearchForm/GuestsInput";
import StartRating from "components/StartRating/StartRating";
import GoogleMapReact from "google-map-react";
import useWindowSize from "hooks/useWindowResize";
import moment from "moment";
import {
  DayPickerSingleDateController,
  isInclusivelyAfterDay,
} from "react-dates";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonCircle from "shared/Button/ButtonCircle";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcImage from "shared/NcImage/NcImage";
import LikeSaveBtns from "./LikeSaveBtns";
import ModalPhotos from "./ModalPhotos";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import ExperiencesDateSingleInput from "components/HeroSearchForm/ExperiencesDateSingleInput";
import MobileFooterSticky from "./MobileFooterSticky";
import { AcompanhanteDataType } from "data/types";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import "@open-wa/whatsapp-button/whatsapp-button.js";
import { ImWhatsapp } from "react-icons/im";
import { RiCellphoneFill } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import BtnOnlineAgora from "components/BtnOnlineAgora/BtnOnlineAgora";

export interface ListingExperiencesDetailPageProps {
  className?: string;
}

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

function capitalizeFirstLetter(string: any) {
  var splitStr = string.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

//Component starts here.

const ListingExperiencesDetailPage: FC<ListingExperiencesDetailPageProps> = ({
  className = "",
}) => {
  const { slug } = useParams();
  console.log("Slug Acompanhante: " + slug);
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const endpointGetAcompanhantes = "/acompanhantes-de-luxo/" + slug;

  const [isOpen, setIsOpen] = useState(false);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(
    moment().add(2, "days")
  );

  const [acompanhante, setAcompanhante] = useState<AcompanhanteDataType>();
  const [acompanhanteModalPhotos, setAcompanhanteModalPhotos] = useState<
    string[]
  >([]);

  const endpointObterDistritos = "/localizacoes/distritos/";
  const endpointObterConcelhos = "/localizacoes/concelhos/";
  const [concelhos, setConcelhos] = useState([]);
  const [distritos, setDistritos] = useState<string[]>([]);

  const [idiomas, setIdiomas] = useState<any>([""]);
  const [atendeA, setAtendeA] = useState<any>([""]);
  const [eventosD, setEventosD] = useState<any>([""]);
  const [servicosA, setservicosA] = useState<any>([""]);
  const [diasatendimentoA, setDiasAtendimento] = useState<any>([""]);

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get(urlbackend + endpointObterDistritos)
      .then((response: AxiosResponse<any>) => {
        setDistritos(response.data);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (distritos.length > 1) {
        axios
          .get(urlbackend + endpointObterConcelhos)
          .then((response: AxiosResponse<any>) => {
            setConcelhos(response.data);
          });
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<AcompanhanteDataType[]>(urlbackend + endpointGetAcompanhantes)
      .then((response: AxiosResponse<any>) => {
        console.log("Response Acompnhante: " + JSON.stringify(response.data));
        setAcompanhante(response.data);
        setAcompanhanteModalPhotos(response.data.imagens);
        console.log("UseEffect ok.");
      });
  }, []);

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<AcompanhanteDataType[]>(urlbackend + endpointGetAcompanhantes)
      .then((response: AxiosResponse<any>) => {
        console.log("Response Acompnhante: " + JSON.stringify(response.data));
        setIdiomas(acompanhante?.idiomas);
        setAtendeA(acompanhante?.atendimento);
        setEventosD(acompanhante?.eventos);
        setservicosA(acompanhante?.servicos);
        setDiasAtendimento(acompanhante?.diasatendimento);
      });
  }, [acompanhante]);

  let idiomasData: any = "";
  if (idiomas) {
    let conteudo: any = "";
    let stringIdiomas: string = "";
    idiomasData = (
      <>
        {idiomasdisponiveis.map((idiomaItem: any, index) => {
          if (idiomas.includes(idiomaItem.slug)) {
            stringIdiomas = stringIdiomas + idiomaItem.name + " / ";
          }
          return conteudo;
        })}
      </>
    );
    idiomasData = stringIdiomas.substring(0, stringIdiomas.length - 2);
  }

  let atendeAData: any = "";
  if (atendeA) {
    let conteudo: any = "";
    let stringAtendea: string = "";
    atendeAData = (
      <>
        {atendimentosDisponiveis.map((atendimentoItem: any, index) => {
          if (atendeA.includes(atendimentoItem.slug)) {
            stringAtendea = stringAtendea + atendimentoItem.name + " / ";
          }
          return conteudo;
        })}
      </>
    );
    atendeAData = stringAtendea.substring(0, stringAtendea.length - 2);
  }

  let locationData: any = "";
  if (acompanhante?.distrito_slug) {
    let conteudo: any = "";
    let stringDistritos: string = "";
    locationData = (
      <>
        {distritos.map((distritoitem: any, index) => {
          if (distritoitem?.slug_distrito.includes(acompanhante?.distrito_slug)) {
            stringDistritos = stringDistritos + distritoitem.nome_distrito;
          }
          return conteudo;
        })}
      </>
    );
    locationData = stringDistritos;
  }

  let concelhoData: any = "";
  if (concelhos) {
    let conteudo: any = "";
    let stringConcelhos: string = "";
    // console.log('distritos: ' + JSON.stringify(distritos))
    // console.log('distrito acompanhante: ' + distrito)
    concelhoData = (
      <>
        {concelhos.map((concelhoitem: any, index) => {
          if (concelhoitem?.slug_concelho.includes(acompanhante?.concelho_slug)) {
            stringConcelhos = stringConcelhos + concelhoitem.nome_concelho;
          }
          return conteudo;
        })}
      </>
    );
    concelhoData = stringConcelhos;
  }

  let locationFinalData = "";
  if (locationData.length > 2) {
    locationFinalData = locationData;
  }
  if (locationData.length > 2 && concelhoData.length > 2) {
    locationFinalData = concelhoData + " , " + locationData;
  }

  let eventosData: any = "";
  if (eventosD) {
    let conteudo: any = "";
    let stringEventos: string = "";
    eventosData = (
      <>
        {eventosdisponiveis.map((eventoItem: any, index) => {
          if (eventosD.includes(eventoItem.slug)) {
            stringEventos = stringEventos + eventoItem.name + " / ";
          }
          return conteudo;
        })}
      </>
    );
    eventosData = stringEventos.substring(0, stringEventos.length - 2);
  }

  let servicosData: any = "";
  if (servicosA) {
    let conteudo: any = "";
    let stringServicos: string = "";
    servicosData = (
      <>
        {servicosDisponiveis.map((servicoItem: any, index) => {
          if (servicosA.includes(servicoItem.slug)) {
            stringServicos = stringServicos + servicoItem.name + " / ";
          }
          return conteudo;
        })}
      </>
    );
    servicosData = stringServicos.substring(0, stringServicos.length - 2);
  }

  let atendimentosDiasData: any = "";
  if (diasatendimentoA) {
    let conteudo: any = "";
    let stringatendimentoDias: string = "";
    atendimentosDiasData = (
      <>
        {diasdasemana.map((diasItem: any, index) => {
          if (diasatendimentoA.includes(diasItem.slug)) {
            stringatendimentoDias =
              stringatendimentoDias + diasItem.name + " / ";
          }
          return conteudo;
        })}
      </>
    );
    atendimentosDiasData = stringatendimentoDias.substring(
      0,
      stringatendimentoDias.length - 2
    );
    if (diasatendimentoA.length === 7) {
      atendimentosDiasData = "Todos os dias";
    }
  }

  const windowSize = useWindowSize();

  const getDaySize = () => {
    if (windowSize.width <= 375) {
      return 34;
    }
    if (windowSize.width <= 500) {
      return undefined;
    }
    if (windowSize.width <= 1280) {
      return 56;
    }
    return 48;
  };

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  const handleCloseModal = () => setIsOpen(false);

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex">
          {acompanhante?.webcam === "sim" && (
            <Badge name="Webcam" color="green" detailpage={false} />
          )}
          {acompanhante?.tipodeatendimento.includes("outcalls") && (
            <Badge name="Deslocação" color="blue" detailpage={false} />
          )}
          {acompanhante?.tipodeatendimento.includes("incalls") && (
            <Badge name="Apartamento" color="red" detailpage={false} />
          )}
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {acompanhante?.nomePerfil &&
            capitalizeFirstLetter(acompanhante?.nomePerfil)}
        </h2>

        {acompanhante?.onlineagora === "sim" && (
          <div>
            <BtnOnlineAgora
              full={true}
              onlineAgora="sim"
              className=""
              text="Disponivel Agora"
            />
          </div>
        )}

        {/* 3 */}
        <div className="flex items-center space-x-4">
          {/* <StartRating /> */}
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">
              {acompanhante?.concelho_name + ", "} {acompanhante?.distrito_name}
            </span>
          </span>
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="flex items-center justify-between xl:justify-center space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
            <span className="title-acompanhante-item">Idade: </span>
            <span className="desc-acompanhante-item">
              {acompanhante?.nomePerfil && acompanhante?.idade + " anos"}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
            <span className="title-acompanhante-item">Olhos: </span>
            <span className="desc-acompanhante-item">
              {acompanhante?.nomePerfil &&
                capitalizeFirstLetter(acompanhante?.olhos) + ""}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
            <span className="title-acompanhante-item">Cabelo: </span>
            <span className="desc-acompanhante-item">
              {acompanhante?.nomePerfil &&
                capitalizeFirstLetter(acompanhante?.cabelo) + ""}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
            <span className="title-acompanhante-item">Naturalidade: </span>
            <span className="desc-acompanhante-item">
              {acompanhante?.nomePerfil &&
                capitalizeFirstLetter(acompanhante?.paisdeorigem) + ""}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between xl:justify-center space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
            <span className="title-acompanhante-item">Altura: </span>
            <span className="desc-acompanhante-item">
              {acompanhante?.nomePerfil && acompanhante?.altura + "  m"}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
            <span className="title-acompanhante-item">Peso: </span>
            <span className="desc-acompanhante-item">
              {acompanhante?.nomePerfil && acompanhante?.peso + " kg"}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
            <span className="title-acompanhante-item">Tatuagens: </span>
            <span className="desc-acompanhante-item">
              {acompanhante?.nomePerfil &&
                capitalizeFirstLetter(acompanhante?.tatuagens) + ""}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between xl:justify-center space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
            <span className="title-acompanhante-item">Idiomas: </span>
            <span className="desc-acompanhante-item">{idiomasData}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
            <span className="title-acompanhante-item">Local: </span>
            <span className="desc-acompanhante-item">
              {acompanhante?.nomePerfil &&
                capitalizeFirstLetter(acompanhante?.concelho_name) +
                  ", " +
                  capitalizeFirstLetter(acompanhante?.distrito_name) +
                  ""}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Atendimento </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Definido pela Anunciante
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {acompanhante?.tipodeatendimento.includes("outcalls") ? (
            <div className="flex items-center space-x-3">
              <i
                className="las la-check-circle text-2xl"
                style={{ color: "green" }}
              ></i>
              <span> Outcalls</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <i
                className="las la-times-circle text-2xl"
                style={{ color: "red" }}
              ></i>
              <span>Outcalls</span>
            </div>
          )}
          {acompanhante?.tipodeatendimento.includes("incalls") ? (
            <div className="flex items-center space-x-3">
              <i
                className="las la-check-circle text-2xl"
                style={{ color: "green" }}
              ></i>
              <span> Incalls</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <i
                className="las la-times-circle text-2xl"
                style={{ color: "red" }}
              ></i>
              <span>Incalls</span>
            </div>
          )}
          {acompanhante?.webcam === "sim" ? (
            <div className="flex items-center space-x-3">
              <i
                className="las la-check-circle text-2xl"
                style={{ color: "green" }}
              ></i>
              <span>Webcam</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <i
                className="las la-times-circle text-2xl"
                style={{ color: "red" }}
              ></i>
              <span>Webcam</span>
            </div>
          )}
          {acompanhante?.atendimentocompleto === "sim" ? (
            <div className="flex items-center space-x-3">
              <i
                className="las la-check-circle text-2xl"
                style={{ color: "green" }}
              ></i>
              <span>Atendimento Completo</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <i
                className="las la-times-circle text-2xl"
                style={{ color: "red" }}
              ></i>
              <span>Atendimento Completo</span>
            </div>
          )}
          {acompanhante?.viajaraconvite === "sim" ? (
            <div className="flex items-center space-x-3">
              <i
                className="las la-check-circle text-2xl"
                style={{ color: "green" }}
              ></i>
              <span>Viaja a convite</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <i
                className="las la-times-circle text-2xl"
                style={{ color: "red" }}
              ></i>
              <span>Viaja a convite</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
          <span className="title-acompanhante-item">Atende a: </span>
          <span className="desc-acompanhante-item">{atendeAData}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
          <span className="title-acompanhante-item">Eventos: </span>
          <span className="desc-acompanhante-item">{eventosData}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
          <span className="title-acompanhante-item">Serviços: </span>
          <span className="desc-acompanhante-item">{servicosData}</span>
        </div>
      </div>
    );
  };

  const renderSectionDisnponilidade = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Disponibilidade</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}

        {acompanhante?.onlineagora === "sim" && (
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
            <i className="la la-clock-o text-2xl" style={{ color: "green" }} />
            <span
              className="title-acompanhante-item"
              style={{ color: "green" }}
            >
              Disponivel Agora{" "}
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
          <i
            className="la la-calendar-check-o text-2xl"
            style={{ color: "grey" }}
          />
          <span className="title-acompanhante-item">Dias de Atendimento: </span>
          <span className="desc-acompanhante-item">{atendimentosDiasData}</span>
        </div>

        {acompanhante?.horarioninicio && acompanhante?.horariofim && (
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-center sm:space-x-3 ">
            <i className="la la-clock-o text-2xl" style={{ color: "grey" }} />
            <span className="title-acompanhante-item">Horário: </span>
            <span className="desc-acompanhante-item">
              {" "}
              {acompanhante?.horarioninicio} até ás {acompanhante?.horariofim}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderSectionCheckIndate = () => {
    return (
      <div className="listingSection__wrap overflow-hidden">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}

        <div className="listingSection__wrap__DayPickerRangeController flow-root">
          <div className="-mx-4 sm:mx-auto xl:mx-[-22px]">
            <DayPickerSingleDateController
              date={selectedDate}
              onDateChange={(date) => setSelectedDate(date)}
              onFocusChange={() => {}}
              focused
              initialVisibleMonth={null}
              numberOfMonths={windowSize.width < 1280 ? 1 : 2}
              daySize={getDaySize()}
              hideKeyboardShortcutsPanel
              isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderSection5 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Host Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              Kevin Francis
            </a>
            <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <StartRating />
              <span className="mx-2">·</span>
              <span> 12 places</span>
            </div>
          </div>
        </div>

        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor swimming pool, a bar, a shared lounge, a
          garden and barbecue facilities...
        </span>

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined in March 2016</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Response rate - 100%</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Fast response - within a few hours</span>
          </div>
        </div>

        {/* == */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <ButtonSecondary href="##">See host profile</ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            San Diego, CA, United States of America (SAN-San Diego Intl.)
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
          <div className="rounded-xl overflow-hidden">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY",
              }}
              yesIWantToUseGoogleMapApiInternals
              defaultZoom={15}
              defaultCenter={{
                lat: 55.9607277,
                lng: 36.2172614,
              }}
            >
              <LocationMarker lat={55.9607277} lng={36.2172614} />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Any experience can be canceled and fully refunded within 24 hours of
            purchase, or at least 7 days before the experience starts.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Guest requirements</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Up to 10 guests ages 4 and up can attend. Parents may also bring
            children under 2 years of age.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">What to bring</h4>
          <div className="prose sm:prose">
            <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
              <li>
                Formal Wear To Visit Bai Dinh Pagoda Be ready before 7.30 Am.
              </li>
              <li>We will pick up from 07.30 to 08.00 AM</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <>
        <div className="listingSectionSidebar__wrap shadow-xl place-items-center">
          {/* PRICE */}

          <div className="flex justify-between">
            <span>
              {acompanhante?.nomePerfil &&
                capitalizeFirstLetter(acompanhante?.nomePerfil)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Acompanhante de Luxo</span>
          </div>
          <div
            style={{ marginTop: "14px" }}
            className="w-14 border-t border-neutral-200 dark:border-neutral-700 flex justify-between"
          ></div>

          <div className="flex justify-between">
            <i
              className="
              la la-mobile-phone text-4xl"
              style={{ color: "grey" }}
            />
            <span className="text-3xl font-semibold">
              {acompanhante?.contactoTelefonico}
            </span>
          </div>

          {/* SUBMIT */}

          <a
            href={`https://api.whatsapp.com/send?phone=${acompanhante?.contactoTelefonico}&text=Ola%2C%20vi%20o%20seu%20an%C3%BAncio%20no%20X!%20Gostaria%20de%20saber%20mais...`}
          >
            <ButtonPrimary whatsapp={true}>
              <ImWhatsapp className="icon_chat" />
              Enviar mensagem Whatsapp
            </ButtonPrimary>
          </a>
        </div>

        <div className="listingSection__wrap shadow-xl place-items-center">
          {" "}
          <div className="flex justify-between">
            <span>Descrição</span>
          </div>
          <div
            style={{ marginTop: "14px" }}
            className="w-14 border-t border-neutral-200 dark:border-neutral-700 flex justify-between"
          ></div>
          <div className="text-neutral-6000 dark:text-neutral-300">
            {acompanhante?.nomePerfil && acompanhante?.bio}
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className={`ListingDetailPage nc-ListingExperiencesDetailPage ${className}`}
      data-nc-id="ListingExperiencesDetailPage"
    >
      {/* SINGLE HEADER */}
      <>
        <header className="container 2xl:px-14 rounded-md sm:rounded-xl adpagecontainer">
          <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
            <div
              className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer "
              onClick={() => handleOpenModal(0)}
            >
              <NcImage
                containerClassName="absolute inset-0"
                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                src={acompanhante?.imageprincipal}
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            {acompanhante?.imagens
              .filter((_, i) => i >= 1 && i < 4)
              .map((item, index) => (
                <div
                  key={index}
                  className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                    index >= 2 ? "block" : ""
                  }`}
                >
                  <NcImage
                    containerClassName="aspect-w-4 aspect-h-3"
                    className=""
                    src={item || ""}
                  />

                  {/* OVERLAY */}
                  <div
                    className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => handleOpenModal(index + 1)}
                  />
                </div>
              ))}

            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={() => handleOpenModal(0)}
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Ver todas as fotos
              </span>
            </div>
          </div>
        </header>
        {/* MODAL PHOTOS */}
        <ModalPhotos
          imgs={acompanhanteModalPhotos}
          // imgs={acompanhanteModalPhotos}
          isOpen={isOpen}
          onClose={handleCloseModal}
          initFocus={openFocusIndex}
          uniqueClassName="nc-ListingExperiencesDetailPage__modalPhotos"
        />
      </>

      {/* MAIn */}
      <main className="container relative z-10 mt-11 flex flex-col lg:flex-row adpagecontainer">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection1()}
          {renderSectionDisnponilidade()}
          {renderSection3()}

          <div className="listingSection__wrap">
            <div>
              <h2 className="text-2xl font-semibold">
                Fotos de {acompanhante?.nomePerfil}{" "}
              </h2>
              <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                Fotos fornecidas pela anunciante.
              </span>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

            {acompanhante?.imagens.map((item, index) => (
              <figure key={acompanhante?.slug + index}>
                <img
                  src={item}
                  alt={acompanhante?.slug + index}
                  className="rounded-2xl"
                />
              </figure>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>
      <div style={{marginBottom: '120px'}} className="w-14 border-b border-neutral-200 dark:border-neutral-700">

      </div>
      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />
    </div>
  );
};

export default ListingExperiencesDetailPage;
