import axios, { AxiosResponse } from "axios";
import { UserContext } from "hooks/UserContext";
import React, { FC, useContext, useEffect, useState } from "react";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";

export interface PageAddListing6Props {}

const PageAddListing6: FC<PageAddListing6Props> = () => {
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const endpointGetAcompanhantes = "/acompanhantes-de-luxo/byanunciante";
  const endpointAcompanhante = "/acompanhantes-de-luxo";
  const { user, setUser } = useContext(UserContext);

  const [descricaoAnuncio, setdescricaoAnuncio] = useState<string>("");
  const [anuncio, setAnuncio] = useState<any>();

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
    if (anuncio?.bio) {
      //TODO anular endpoint ,
      setdescricaoAnuncio(anuncio?.bio);
    }
  }, [anuncio]);

  const updateAdCamposExtra = () => {
    axios
      .put(urlbackend + endpointAcompanhante + "/" + anuncio._id, {
        bio: descricaoAnuncio,
      })
      .then((response: AxiosResponse<any>) => {
        console.log("Response: " + JSON.stringify(response.data));
        console.log("UseEffect ok.");
      });
  };

  const handleDescricaoAnuncio = (event: any) => {
    console.log("descricao: 👉️", event.target.value);
    setdescricaoAnuncio(event.target.value);
  };
  return (
    <CommonLayout
      index="04"
      backtHref="/adicionaranuncio-3"
      nextHref="/adicionaranuncio-5"
      onClick={async () => {
        await updateAdCamposExtra();
      }}
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Descrição do Anúncio</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Este texto será visivel na descrição do seu anúncio. Deve usá-lo
            para se dar a conhecer e fazer a sua apresentação. O direito de
            apresentar o texto está reservado ao site.
          </span>
        </div>

        <Textarea
          onChange={handleDescricaoAnuncio}
          placeholder="Escreva um pequeno texto aqui.."
          rows={14}
          value={descricaoAnuncio}
        />
      </>
    </CommonLayout>
  );
};

export default PageAddListing6;
