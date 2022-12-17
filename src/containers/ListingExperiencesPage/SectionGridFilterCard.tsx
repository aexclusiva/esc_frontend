import React, { FC, useEffect, useState } from "react";
import { DEMO_EXPERIENCES_LISTINGS } from "data/listings";
import {
  ExperiencesDataType,
  StayDataType,
  AcompanhanteDataType,
} from "data/types";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import { useSearchParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useWindowSize } from "react-use";
export interface SectionGridFilterCardProps {
  className?: string;
}

const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
const endpointGetAcompanhantes = "/acompanhantes-de-luxo";
const endpointGetAcompanhantesTotal = "/acompanhantes-de-luxo/total";
const endpointAcompanhantesemDestaque = "/acompanhantes-de-luxo/emdestaque";
const endpointAcompanhantesNovidades = "/acompanhantes-de-luxo/novidades";
const endpointAcompanhantesOnlineAgora =
  "/acompanhantes-de-luxo/disponivelagora";

function capitalizeFirstLetter(string: any) {
  if (string && string.length > 2) {
    var splitStr = string.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
  }
  return splitStr.join(" ");
}

const datatype: AcompanhanteDataType[] = [
  {
    _id: "638010276c6c55c48ab6a483",
    nomePerfil: "Alice Diniz",
    slug: "alice-diniz",
    email: "teste@teste.com",
    bio: "Olá sou a Alice Diniz , sou brasileira, tenho 23 anos, olhos castanhos claros, e estou à sua espera para momentos inesquecíveis.  Gosto de passear em Lisboa e de beber um cocktail num local exclusivo da cidade.  Sou uma mulher sexy, doce, aventureira e divertida. Faço um atendimento personalizado a homens e casais e garanto que irá desfrutar de um excelente momento.Partilhe comigo o seu fetiche e irei torna-lo realidade. Faço shows de striptease de deixar o noivo e convidados extasiados, e tornar a despedida de solteiro num dia inesquecível.  Também faço massagens sensuais. Pede-me uma massagem relaxante para um momento de prazer intenso e inesquecível. Entre em contacto comigo, garanto que o tempo que estaremos juntos será inesquecível.",
    imagens: [
      "https://www.apartadox.com/images/galeria/AliceDiniz07Novembro2022/alice-diniz-escort-02.webp",
      "https://www.apartadox.com/images/galeria/AliceDiniz07Novembro2022/alice-diniz-escort-01.webp",
    ],
    imageprincipal:
      "https://www.apartadox.com/images/galeria/AliceDiniz07Novembro2022/alice-diniz-escort-02.webp",
    imagecover:
      "https://www.apartadox.com/images/galeria/AliceDiniz07Novembro2022/alice-diniz-escort-02.webp",
    video: "https://www.youtube.com/watch?v=o0yLdYpCEy8",
    contactoTelefonico: "+351 671 232 123",
    idade: 23,
    olhos: "castanhos claros",
    cabelo: "loiro",
    paisdeorigem: "brasil",
    altura: "1,69",
    peso: "50 kg",
    busto: "81 cm",
    tatuagens: "sim",
    idiomas: ["Português", "Inglês"],
    tipodeatendimento: "completo",
    atendimento: ["Incalls", "Outcalls"],
    concelho_name: "Lisboa",
    distrito_name: "Lisboa",
    concelho_slug: "lisboa",
    distrito_slug: "lisboa",
    eventos: ["ferias", "teste"],
    servicos: [""],
    atendea: "Homens/Casais",
    disponibilidade: "Todos os dias - 24 horas",
    sessaodefotos: "Menos de 3 meses",
    viajaraconvite: "Aceito convites Porto e Lisboa",
    visualizacoes: 0,
    cliqueswhatsapp: 0,
    destaquepaginaprincipal: false,
    destaquenalocalizacao: false,
    destaqueasnossasescolhas: false,
    onlineagora: "nao",
    webcam: "nao",
    deslocacoes: false,
    apartamento: false,
    atendemulheres: false,
    atendehomens: false,
    atendecasais: false,
    atende24horas: false,
    atendimentocompleto: "teste",
    idanunciante: "teste",
    diasatendimento: ["2f", "3f"],
    horarioninicio: "16:30",
    horariofim: "23:40",
    anuncioverificado: true,
  },
];

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredParams, setfilteredParams] = useState("");
  const distrito = searchParams.get("distrito");
  const concelho = searchParams.get("concelho");
  let endpointdistrito = "";
  if (distrito && distrito?.length > 2) {
    endpointdistrito = "/distrito/" + distrito;
  } else {
    endpointdistrito = "";
  }
  let endpointconcelho = "";
  if (concelho && concelho?.length > 2) {
    endpointconcelho = "/concelho/" + concelho;
  } else {
    endpointconcelho = "";
  }
  const [acompanhantes, setAcompanhantesList] =
    useState<AcompanhanteDataType[]>(datatype);

  const [acompanhantesEmdestaque, setacompanhantesEmdestaque] =
    useState<AcompanhanteDataType[]>(datatype);

  const [acompanhantesOnlineAgora, setacompanhantesOnlineAgora] =
    useState<AcompanhanteDataType[]>(datatype);

  const [acompanhantesNovidades, setacompanhantesNovidades] =
    useState<AcompanhanteDataType[]>(datatype);

  const handleFitlerSwap = (filterstring: any) => {
    if (filterstring.length > 1) {
      setfilteredParams(filterstring);
    }
  };

  const [filterGavechanged, setfiltersChanged] = useState(false);

  const WIN_WIDTH = useWindowSize().width || window.innerWidth;

  //Obter Filtragem Acompanhantes
  useEffect(() => {
    if (filteredParams.length > 1) {
      axios
        .get<AcompanhanteDataType[]>(
          urlbackend + endpointGetAcompanhantes + "/" + filteredParams
        )
        .then((response: AxiosResponse<any>) => {
          console.log("Response: " + JSON.stringify(response.data));
          setAcompanhantesList(response.data);
          console.log("UseEffect ok.");
        });
    } else {
      axios
        .get<AcompanhanteDataType[]>(urlbackend + endpointGetAcompanhantesTotal)
        .then((response: AxiosResponse<any>) => {
          console.log("Response: " + JSON.stringify(response.data));
          setAcompanhantesList(response.data);
          console.log("UseEffect ok.");
        });
    }
  }, [filteredParams]);

  //Obter Filtragem Acompanhantes em Destque
  useEffect(() => {
    let destaqueery = "?&destaquenalocalizacao=true";
    if (filteredParams.length > 2) {
      destaqueery = "&destaquenalocalizacao=true";
    }

    axios
      .get<AcompanhanteDataType[]>(
        urlbackend +
          endpointAcompanhantesemDestaque +
          "/" +
          filteredParams +
          destaqueery
      )
      .then((response: AxiosResponse<any>) => {
        console.log("Response: " + JSON.stringify(response.data));
        setacompanhantesEmdestaque(response.data);
        console.log("UseEffect ok.");
      });
  }, [filteredParams]);

  //Obter Filtragem Online Agora
  useEffect(() => {
    let destaqueery = "?&onlineagora=sim";
    if (filteredParams.length > 2) {
      destaqueery = "&onlineagora=sim";
    }
    axios
      .get<AcompanhanteDataType[]>(
        urlbackend +
          endpointAcompanhantesOnlineAgora +
          "/" +
          filteredParams +
          destaqueery
      )
      .then((response: AxiosResponse<any>) => {
        console.log("Response: " + JSON.stringify(response.data));
        setacompanhantesOnlineAgora(response.data);
        console.log("UseEffect ok.");
      });
  }, [filteredParams]);

  //Obter Filtragem Novidades
  useEffect(() => {
    let destaqueery = "?&sort=desc";
    if (filteredParams.length > 2) {
      destaqueery = "&sort=desc";
    }
    axios
      .get<AcompanhanteDataType[]>(
        urlbackend +
          endpointAcompanhantesNovidades +
          "/" +
          filteredParams +
          destaqueery
      )
      .then((response: AxiosResponse<any>) => {
        console.log("Response: " + JSON.stringify(response.data));
        setacompanhantesNovidades(response.data);
        console.log("UseEffect ok.");
      });
  }, [filteredParams]);

  return (
    <div
      style={{ paddingTop: "120px" }}
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      {distrito && !concelho && (
        <Heading2
          heading="As melhores acompanhantes em "
          headingsubs={capitalizeFirstLetter(distrito)}
        />
      )}
      {concelho && (
        <Heading2
          heading="As melhores acompanhantes em "
          headingsubs={
            capitalizeFirstLetter(concelho) +
            " ," +
            capitalizeFirstLetter(distrito)
          }
        />
      )}
      {!distrito && !concelho && (
        <Heading2 heading="Acompanhantes de " headingsubs="Luxo" />
      )}

      <div className="mb-8 lg:mb-11">
        <TabFilters
          onChangeFilters={(filtersstring) => {
            handleFitlerSwap(filtersstring);
          }}
        />
      </div>

      {acompanhantesEmdestaque && acompanhantesEmdestaque.length >= 1 ? (
        <>
          <div>
            {WIN_WIDTH < 768 ? (
              <>            <h2
              style={{ paddingTop: "16px", marginBottom: "22px", textAlign:'center' }}
              className="font-semibold text-3xl"
            >
              Acompanhantes em Destaque
            </h2>
              <div
                style={{ padding: "6px" }}
                className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
              >
                {acompanhantesEmdestaque.map((acompanhante) => (
                  <ExperiencesCard
                    key={acompanhante._id}
                    datapass={acompanhante}
                    ratioClass="aspect-w-6 aspect-h-3"
                    margintp="-2px"
                    mobile={true}
                    size="small"
                  />
                ))}
              </div>
           </> ) : (<>
                        <h2
                        style={{ padding: "16px", marginBottom: "12px" }}
                        className="font-semibold text-3xl"
                      >
                        Acompanhantes em Destaque
                      </h2>
              <div className="grid grid-cols-2 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {acompanhantesEmdestaque.map((acompanhante) => (
                  <div className="hidden lg:block ">
                    <ExperiencesCard
                      key={acompanhante._id}
                      datapass={acompanhante}
                      ratioClass="aspect-w-3 aspect-h-3"
                    />
                  </div>
                ))}
              </div>
              </> )}
          </div>
        </>
      ) : (
        <></>
      )}

      {acompanhantesOnlineAgora.length >= 1 ? (
        <>
          {WIN_WIDTH < 768 ? (
                    <>
                    <h2
                     style={{ paddingTop: "16px", marginBottom: "22px", textAlign:'center' }}
                     className="font-semibold text-3xl"
                    >
                      Disponiveis Agora
                    </h2>
            <div
              style={{ padding: "6px" }}
              className="grid grid-cols-3 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
            >
              {acompanhantesOnlineAgora.map((acompanhante) => (
                <ExperiencesCard
                  key={acompanhante._id}
                  datapass={acompanhante}
                  ratioClass="aspect-w-5 aspect-h-6"
                  size="small"
                />
              ))}
            </div>
         </> ) : (
                  <>
                  <h2
                    style={{ padding: "16px", marginBottom: "12px" }}
                    className="font-semibold text-3xl"
                  >
                    Disponiveis Agora
                  </h2>
            <div className="grid grid-cols-2 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {acompanhantesOnlineAgora.map((acompanhante) => (
                <div className="hidden lg:block ">
                  <ExperiencesCard
                    key={acompanhante._id}
                    datapass={acompanhante}
                    ratioClass="aspect-w-3 aspect-h-3"
                  />
                </div>
              ))}
            </div>
          </>)}
        </>
      ) : (
        <></>
      )}

      {acompanhantesNovidades.length >= 1 ? (
        <>
          {WIN_WIDTH < 768 ? (
                        <>
                        <h2
                       style={{ paddingTop: "16px", marginBottom: "22px", textAlign:'center' }}
                       className="font-semibold text-3xl"
                      >
                        As mais Recentes
                      </h2>
            <div
              style={{ padding: "16px" }}
              className="grid grid-cols-3 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
            >
              {acompanhantesNovidades.map((acompanhante) => (
                <ExperiencesCard
                  key={acompanhante._id}
                  datapass={acompanhante}
                  ratioClass="aspect-w-5 aspect-h-6"
                  size="small"
                />
              ))}
            </div>
          </>) : (
            <>
            <h2
            style={{ padding: "16px", marginBottom: "12px" }}
            className="font-semibold text-3xl"
          >
            As mais Recentes
          </h2>
            <div className="grid grid-cols-2 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {acompanhantesNovidades.map((acompanhante) => (
                <div className="hidden lg:block ">
                  <ExperiencesCard
                    key={acompanhante._id}
                    datapass={acompanhante}
                    ratioClass="aspect-w-3 aspect-h-3"
                  />
                </div>
              ))}
            </div>
            </>)}
        </>
      ) : (
        <></>
      )}

      {acompanhantes && acompanhantes.length >= 1 ? (
        <>
          {WIN_WIDTH < 768 ? (
            <>
              <h2
                style={{ paddingTop: "16px", marginBottom: "22px", textAlign:'center' }}
                className="font-semibold text-3xl"
              >
                Acompanhantes
              </h2>
              <div
                style={{ padding: "16px" }}
                className="grid grid-cols-3 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
              >
                {acompanhantes.map((acompanhante) => (
                  <ExperiencesCard
                    key={acompanhante._id}
                    datapass={acompanhante}
                    ratioClass="aspect-w-5 aspect-h-6"
                    size="small"
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <h2
                style={{ padding: "16px", marginBottom: "12px" }}
                className="font-semibold text-3xl"
              >
                Acompanhantes
              </h2>
              <div className="grid grid-cols-2 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {acompanhantes.map((acompanhante) => (
                  <div className="hidden lg:block ">
                    <ExperiencesCard
                      key={acompanhante._id}
                      datapass={acompanhante}
                      ratioClass="aspect-w-3 aspect-h-3"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <></>
      )}

      {acompanhantes.length < 1 ? (
        <p>Não foram encontrados resultados.</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SectionGridFilterCard;
