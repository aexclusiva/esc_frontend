import axios, { AxiosResponse } from "axios";
import { UserContext } from "hooks/UserContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { DayPickerSingleDateController } from "react-dates";
import CommonLayout from "./CommonLayout";

export interface PageAddListing7Props {}

const PageAddListing7: FC<PageAddListing7Props> = () => {
  const { user, setUser } = useContext(UserContext);
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const [anuncio, setAnuncio] = useState<any>();
  const endpointGetAcompanhantes = "/acompanhantes-de-luxo/byanunciante";
  const endpointuser = "/utilizador";
  const endpointAcompanhante = "/acompanhantes-de-luxo";

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

  const updateAt = () => {
    axios
      .put(urlbackend + endpointAcompanhante + "/" + anuncio._id, {
        imagens: [
          "https://www.apartadox.com/images/galeria/AliceDiniz07Novembro2022/alice-diniz-escort-02.webp",
          "https://www.apartadox.com/images/galeria/AliceDiniz07Novembro2022/alice-diniz-escort-01.webp",
          "https://www.apartadox.com/images/galeria/AliceDiniz07Novembro2022/alice-diniz-escort-01.webp",
          "https://www.apartadox.com/images/galeria/AliceDiniz07Novembro2022/alice-diniz-escort-01.webp",
          "https://www.apartadox.com/images/galeria/AliceDiniz07Novembro2022/alice-diniz-escort-01.webp",
          "https://www.apartadox.com/images/galeria/AliceDiniz07Novembro2022/alice-diniz-escort-01.webp",
           
        ],
        imageprincipal:
          "https://www.apartadox.com/images/galeria/AliceDiniz07Novembro2022/alice-diniz-escort-02.webp",
        imagecover:
          "https://www.apartadox.com/images/galeria/AliceDiniz07Novembro2022/alice-diniz-escort-02.webp",
        video: "https://www.youtube.com/watch?v=o0yLdYpCEy8",
      })
      .then((response: AxiosResponse<any>) => {
        console.log("Response: " + JSON.stringify(response.data));
        console.log("UseEffect ok.");
      });
  };

  return (
    <CommonLayout
      index="05"
      backtHref="/adicionaranuncio-4"
      nextHref="/adicionaranuncio-6"
      onClick={async () => {
        console.log("fromparent");
        await updateAt();
      }}
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Fotos e videos</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Carregue as fotos que serão públicas no seu anúncio. O site reserva
            o direito de aceitar ou rejeitar as fotos carregadas.
          </span>
        </div>

        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          <div>
            <span className="text-lg font-semibold">Foto Principal</span>
            <div className="mt-5 ">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-neutral-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ----------------- */}
          <div>
            <span className="text-lg font-semibold">
              Fotos do Anúncio - Minimo 4 Fotos
            </span>
            <div className="mt-5 ">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-neutral-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                    <label
                      htmlFor="file-upload-2"
                      className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-2"
                        name="file-upload-2"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ----------------- */}
          <div>
            <span className="text-lg font-semibold">Fotos de Capa</span>
            <div className="mt-5 ">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-neutral-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                    <label
                      htmlFor="file-upload-2"
                      className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-2"
                        name="file-upload-2"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Data da Sessão de Fotos</h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              Escolha a data em que foi feita a sessão de fotos.
            </span>
          </div>
          {/* ----------------- */}
          <div>
            <span className="text-lg font-semibold">Video (Opcional)</span>
            <div className="mt-5 ">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-neutral-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing7;
