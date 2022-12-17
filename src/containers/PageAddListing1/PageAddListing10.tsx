import axios, { AxiosResponse } from "axios";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import StayCard from "components/StayCard/StayCard";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { AcompanhanteDataType } from "data/types";
import { UserContext } from "hooks/UserContext";
import React, { FC, useContext, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";

export interface PageAddListing10Props {}

const datatype: AcompanhanteDataType = {
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
};

const PageAddListing10: FC<PageAddListing10Props> = () => {
  const { user, setUser } = useContext(UserContext);
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const endpointGetAcompanhantes = "/acompanhantes-de-luxo/byanunciante";
  const endpointuser = "/utilizador";

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

  const [anuncio, setAnuncio] = useState<AcompanhanteDataType>();

  return (
    <CommonLayout
      nextBtnText="Continuar"
      index="08"
      backtHref="/adicionaranuncio-7"
      nextHref="/painel"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Anúncio Submetido 🎉</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            <br />
            O seu anúncio foi para submetido aprovação com sucesso! <br />
            Após ser revisto pela equipa será contactada via email para
            finalizar o processo de publicação.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
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
          <ButtonPrimary
            link={"/acompanhantes-de-luxo/previsualizar/" + anuncio?.slug}
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
            <span className="ml-3">Pre-visualizar Anúncio Completo </span>
          </ButtonPrimary>
        </div>
        {/*  */}
      </>
    </CommonLayout>
  );
};

export default PageAddListing10;
