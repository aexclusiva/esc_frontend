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
export interface SectionGridFilterCardPesquisaResultsProps {
  className?: string;
}

const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
const endpointGetAcompanhantesPesquisa = "/acompanhantes-de-luxo/pesquisa";
const endpointGetAcompanhantesTotal = "/acompanhantes-de-luxo/total";



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

const SectionGridFilterCardPesquisaResults: FC<
  SectionGridFilterCardPesquisaResultsProps
> = ({ className = "" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredParams, setfilteredParams] = useState("");
  
  let pesquisa = searchParams.get("search") || "";

  const [acompanhantes, setAcompanhantesList] =
    useState<AcompanhanteDataType[]>([]);

  //Obter Filtragem Acompanhantes
  useEffect(() => {
    axios
      .get<AcompanhanteDataType[]>(
        urlbackend + endpointGetAcompanhantesPesquisa + "/" + pesquisa
      )
      .then((response: AxiosResponse<any>) => {
        console.log("Response: " + JSON.stringify(response.data));
        setAcompanhantesList(response.data);
        console.log("UseEffect ok.");
      });
  }, [pesquisa]);

  return (
    <div
      style={{ paddingTop: "120px" }}
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 heading="Resultados da Pesquisa" headingsubs="" />

      {acompanhantes && acompanhantes.length >= 1 ? (
        <>
          <h2
            style={{ padding: "16px", marginBottom: "12px" }}
            className="font-semibold text-3xl"
          ></h2>
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {acompanhantes ? (
              acompanhantes.map((acompanhante) => (
                <ExperiencesCard
                  key={acompanhante._id}
                  datapass={acompanhante}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}

      {acompanhantes && acompanhantes.length < 1 ? (
        <p>Não foram encontrados resultados.</p>
      ) : (
        <></>
      )}

      <p>Não foi pesquisou nenhum item.</p>
    </div>
  );
};

export default SectionGridFilterCardPesquisaResults;
