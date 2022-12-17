import React, { useState, useEffect, FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import imagePng from "images/hero-right.png";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import axios, { AxiosResponse } from "axios";
import { AcompanhanteDataType } from "data/types";
import BtnOnlineAgora from "components/BtnOnlineAgora/BtnOnlineAgora";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import { useWindowSize } from "react-use";
import Select from "shared/Select/Select";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapPinIcon } from "@heroicons/react/24/solid";

const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
const endpointGetAcompanhantes =
  "/acompanhantes-de-luxo/destaque/paginaprincipal";

const endpointSearch = "/acompanhantes-de-luxo/?&distrito=";
export interface SectionHeroProps {
  className?: string;
}

//block scroll
//document.body.style.overflow = "hidden"

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const endpointObterDistritos = "/localizacoes/distritos/";
  const endpointObterdoDistritoporSlug = "/localizacoes/concelhos/porslug/";

  const [acompanhante, setAcompanhante] = useState<AcompanhanteDataType>();
  const [distritos, setDistritos] = useState<string[]>([]);
  const [selectedDistrito, setSelectedDistrito] = useState("");
  const [selectedDistritoName, setSelectedDistritoName] = useState("");
  const navigate = useNavigate();
  const defaultValueArray = [""];
  const [distritosMaisVisitados, setDistritosMaisVisitados] =
    useState<any>(defaultValueArray);

  const endpointObterDistritosMaisRequisitados5 =
    "/localizacoes/distritos/maisanuncios";

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get(urlbackend + endpointObterDistritosMaisRequisitados5)
      .then((response: AxiosResponse<any>) => {
        setDistritosMaisVisitados(response.data);
      });
  }, []);



  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get(urlbackend + endpointObterDistritos)
      .then((response: AxiosResponse<any>) => {
        setDistritos(response.data);
      });
  }, []);

  const WIN_WIDTH = useWindowSize().width || window.innerWidth;
  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<AcompanhanteDataType>(urlbackend + endpointGetAcompanhantes)
      .then((response: AxiosResponse<any>) => {
        setAcompanhante(response.data);
      });
  }, []);

  const handleChangeSelectedDistrito = (event: any) => {
    console.log(
      "Label Selected Distrito: 👉️",
      event.target.selectedOptions[0].label
    );
    console.log("Valor Selected Distrito: 👉️", event.target.value);
    setSelectedDistrito(event.target.value);
    setSelectedDistritoName(event.target.selectedOptions[0].label);
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
  //Prevent Scroll
/*   useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
        document.body.classList.remove("overflow-hidden");
    };
}, []); */

  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-2/5 flex flex-col items-start space-y-8 sm:space-y-10 lg:pb-64  lg:mr-10 xl:mr-0">
          <div className="hidden lg:block p-5">
            <span className="block font-semibold text-xl sm:text-2xl">
              Principais Zonas de Atendimento
            </span>
   
            <p className="block font-semibold text-base">
              {"Zona de Atendimento"}
            </p>
            <div className="mt-5">
              {distritosMaisVisitados.length > 2 &&
                distritosMaisVisitados.map((item, index) => (
                  <div
                    className="py-2 mb-1 flex items-center space-x-3 text-lg"
                    key={index}
                  >
                    <Link
                      reloadDocument
                      to={endpointSearch + item?.slug_distrito}
                    >
                      {" "}
                      <span className="">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="iconLocation"
                        />{" "}
                        {item?.nome_distrito}
                      </span>
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          {WIN_WIDTH < 768 && (
            <>
              <div
                style={{
                  padding: "0px",
                  width: "100%",
                  height: "48em",
                  marginTop: "0px",
                }}
              >
                <img
                  className="imageFullHero"
                  src="https://www.momentosdeprazer.com/Content/profiles/1270/2249/Highlight/1.jpg"
                  //src={acompanhante?.imageprincipal}
                  alt="hero"
                />{" "}
                <a
                  className="boxdestaque"
                  href={"/acompanhantes-de-luxo/" + acompanhante?.slug}
                >
                  <h1 className="seo-title">
                    {acompanhante?.nomePerfil} em {acompanhante?.distrito_name}
                  </h1>
                </a>
                <div className="distritoSelector">
                  <Select
                    value={selectedDistrito}
                    required
                    onChange={handleChangeSelectedDistrito}
                  >
                    <option disabled={true} value="">
                      Escolha um Distrito
                    </option>
                    {dataDistritos}
                  </Select>{" "}
                </div>
                <div className="distritoButton">
                  <div className="grid gap-3 items-stretch">
                    <ButtonPrimary
                      type="submit"
                      onClick={() => {
                        if (selectedDistrito.length > 1) {
                          navigate(
                            "/acompanhantes-de-luxo/" +
                              "?&distrito=" +
                              selectedDistrito
                          );
                        }
                      }}
                    >
                      Pesquisar
                    </ButtonPrimary>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-28 w-full">
            <HeroSearchForm />
          </div>
          <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-28 w-full">
            <div className="flex place-content-center">
              <ButtonPrimary link="/#">ANUNCIAR CONNOSCO</ButtonPrimary>
            </div>
          </div>
          <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-28 w-full">
            <div className="flex place-content-center">
              <ButtonPrimary link="/entrar">
                ENTRAR - ÁREA RESERVADA
              </ButtonPrimary>
            </div>
            <div className="flex place-content-center">
              <p>Reservado a Anunciantes.</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block rightSideWrapperHero">
          <img
            className="imageFullHero2"
            src="https://www.momentosdeprazer.com/Content/profiles/1270/2249/Highlight/1.jpg"
            
            //ssrc={acompanhante?.imageprincipal}
            alt="hero"
          />
          <a
            className="boxdestaque"
            href={"/acompanhantes-de-luxo/" + acompanhante?.slug}
          >
            <h1 className="seo-title">{acompanhante?.nomePerfil}</h1>
            <h2 className="seo-title2">
              <FontAwesomeIcon icon={faLocationDot} className="iconLocation" />{" "}
              {acompanhante?.distrito_name}
            </h2>
            <h1 className="seo-title3pc">
              Ultimas Acompanhantes Porto - Lisboa e Escorts Lisbon
            </h1>
             <div className="seo-titledesc">
              Acompanhantes Portuguesas e Internacionais Portugal esse belo país
              e repleto de particularidades que fazem dessa linda terra uma das
              mais belas e atraentes da Europa. Os portugueses, sempre cheios de
              vida, transbordam simpatia, alegria e convivem em plena harmonia
              com povos de todo o mundo. E como em muitos outros destinos
              europeus, Portugal também conta com um excelente serviço de
              Acompanhantes, Massagistas, Stripers, Dominatrix de várias
              nacionalidades ao melhor nível. Confira os anúncios que temos
              atualmente disponíveis nas páginas de Braga, Porto, Coimbra,
              Leiria, Lisboa, Cascais, Albufeira ou Faro. Em Acompanhantes
              Lisboa e Acompanhantes Porto encontrará uma vasta escolha de
              Escorts prontas a satisfazerem os seus mais secretos desejos, na
              maior discrição e recato, seja em domicílios ou hotéis.
              Disponibilizamos também para a sua maior satisfação, a mesma
              qualidade e variedade de escorts em diferentes cidades de
              Portugal, para o que basta escolher quem mais lhe agrada através
              de fotografias e vídeos produzidos por profissionais. É proibida a
              reprodução do conteúdo desta página em qualquer meio de
              comunicação, eletrónico ou impresso, sem autorização escrita do
              ApartadoX. A melhor Escort em Portugal Apartadox.com apresenta as
              acompanhantes de luxo em diversas regiões deste extraordinário
              país. Caso pretenda descansar e relaxar acompanhado com uma bela e
              educada mulher, a nossa oferta de luxo estará ao seu dispor! Uma
              acompanhante cortês e encantada seria um pormenor agradável
              durante a sua viagem para o Porto, Algarve ou Lisboa. O conteúdo
              da nossa página é uma garantia antecipada de emoções
              inesquecíveis. Tenha o prazer de comunicar com uma pessoa
              carinhosa da sua escolha. Sobre os nossos anúncios Devido à
              excelente qualidade da nossa página, as anunciantes que nos
              procuram, têm uma agradável aparência visual e com elevadas
              qualidades individuais. Todas elas são bem formadas, comportadas,
              pontuais e não tem nada de vulgar. Delicie- se com sensualidade e
              sexualidade das nossas anunciantes. Elas, com prazer o
              acompanharão numa conversa desenvolta ou participarão numa
              brincadeira picante. Organize um passatempo agradável Não perca
              tempo, está a um passo de encontrar a acompanhante dos seus
              sonhos! Escolha em um dos melhores sites de acompanhantes em
              Portugal. Avalie o perfil detalhadamente, desde a cor dos olhos
              até ao conhecimento de idiomas. Veja também os vídeos e
              fotografias para fazer uma escolha acertada. O conteúdo é de
              acesso livre a todos os utilizadores que procurem uma acompanhante
              de luxo Fique confiante na sua procura, na nossa página de
              anúncios de Escort em Portugal encontrará um passatempo brilhante
              e rico.
            </div> 
          </a>
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
