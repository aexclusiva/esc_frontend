import { MapPinIcon } from "@heroicons/react/24/solid";
import axios, { AxiosResponse } from "axios";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import Label from "components/Label/Label";
import GoogleMapReact from "google-map-react";
import { UserContext } from "hooks/UserContext";
import React, { FC, useContext, useEffect, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";

export interface PageAddListing2Props {}

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

function string_to_slug(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

const PageAddListing2: FC<PageAddListing2Props> = () => {
  const { user, setUser } = useContext(UserContext);
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const endpointGetAcompanhantes = "/acompanhantes-de-luxo/byanunciante";
  const endpointuser = "/utilizador";

  const [nomeprofissional, setNomeProfissional] = useState<string>("");
  const [idade, setIdade] = useState("");
  const [contactotelefonico, setContactoTelefonico] = useState<string>("");
  const [paisdeOrigem, setPaisdeOrigem] = useState("angola");
  const [slug, setslug] = useState("");
  const [idanuncio, setIdAnuncio] = useState<string>("");
  const endpointAcompanhante = "/acompanhantes-de-luxo";
  const [anuncio, setAnuncio] = useState<any>();

  const createAdandBasic = () => {
    axios
      .put(urlbackend + endpointAcompanhante + "/" + anuncio._id, {
        nomePerfil: nomeprofissional,
        idade: idade,
        contactoTelefonico: contactotelefonico,
        paisdeorigem: paisdeOrigem,
        idanunciante: user?._id,
        email: user?.email,
        slug: slug,
      })
      .then((response: AxiosResponse<any>) => {
        console.log("Response: " + JSON.stringify(response.data));
        console.log("UseEffect ok.");
        setIdAnuncio(response.data._id);
      });
  };
  const updateUser = () => {
    axios
      .put(urlbackend + endpointuser + "/" + user._id, {
        hasAnuncio: true,
        idanuncio: idanuncio,
      })
      .then((response: AxiosResponse<any>) => {
        console.log("Response: " + JSON.stringify(response.data));
        console.log("UseEffect ok.");
      });
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
    if (anuncio?.nomePerfil) {
      setNomeProfissional(anuncio?.nomePerfil);
    }
    if (anuncio?.idade) {
      if  (anuncio?.idade < 18){
      setIdade("");
      }else{
      setIdade(anuncio?.idade);}
    }
    
    if (anuncio?.contactoTelefonico) {
      setContactoTelefonico(anuncio?.contactoTelefonico);
    }
    if (anuncio?.paisdeOrigem) {
      setPaisdeOrigem(anuncio?.paisdeOrigem);
    }    
    if (anuncio?.slug) {
      setslug(anuncio?.slug);
    }
    if (anuncio?.paisdeOrigem) {
      setPaisdeOrigem(anuncio?.paisdeOrigem);
    }
  }, [anuncio]);

  const handlenomeprofissional = (event: any) => {
    console.log("Nome profissional: 👉️", event.target.value);
    setNomeProfissional(event.target.value);
    setslug(string_to_slug(event.target.value));
  };

  const handleidade = (event: any) => {
    console.log("Idade: 👉️", event.target.value);
    setIdade(event.target.value);
  };
  const handlecontacto = (event: any) => {
    console.log("Contacto: 👉️", event.target.value);
    setContactoTelefonico(event.target.value);
  };

  const handlePaisdeOrigem = (event: any) => {
    console.log("Pais de Origem: 👉️", event.target.selectedOptions[0].label);
    console.log("Valor Pais de Origem: 👉️", event.target.value);
    setPaisdeOrigem(event.target.value);
  };

  return (
    <CommonLayout
      index="02"
      nextHref="/adicionaranuncio-3"
      backtHref="/adicionaranuncio-1"
      onClick={async () => {
        console.log("fromparent");
        await createAdandBasic();
        await updateUser();
      }}
    >
      <>
        <h2 className="text-2xl font-semibold">Informações Básicas</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        
        <div className="space-y-8">
          <FormItem
            label="Nome Profissional"
            
            desc="Este nome será visivel na página do anúncio."
          >
            <Input
              placeholder="Introduza aqui..."
              onChange={handlenomeprofissional}
              value={nomeprofissional}
              required
            />
          </FormItem>
          <FormItem label="Idade">
            <Input placeholder="Introduza aqui..." onChange={handleidade} 
              value={idade}/>
          </FormItem>
          <FormItem label="Contacto Telefónico">
            <Input placeholder="Introduza aqui..." onChange={handlecontacto}
              value={contactotelefonico} />
          </FormItem>
          <FormItem
            label="Pais de Origem"
            desc="Os utilizadores podem filtrar os anúncios pelo pais de origem."
          >
            <Select onChange={handlePaisdeOrigem}>
              <option disabled={true} value="">
                Escolha um pais
              </option>
              {dataPaisdeOrigem}
            </Select>
          </FormItem>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing2;
