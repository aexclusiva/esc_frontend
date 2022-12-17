import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_EXPERIENCES_LISTINGS } from "data/listings";
import { AcompanhanteDataType, ExperiencesDataType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import BtnOnlineAgora from "components/BtnOnlineAgora/BtnOnlineAgora";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ExperiencesCardProps {
  className?: string;
  ratioClass?: string;
  mobile?: boolean;
  margintp?: string;
  datapass: AcompanhanteDataType;
  size?: "default" | "small";
}

const ExperiencesCard: FC<ExperiencesCardProps> = ({
  size = "default",
  className = "",
  mobile = false,
  margintp = "",
  datapass,
  ratioClass = "aspect-w-3 aspect-h-3",
}) => {
  //console.log('Experiences card info: ' + JSON.stringify(datapass))
  const {
    slug,
    nomePerfil,
    email,
    bio,
    imagens,
    imageprincipal,
    imagecover,
    video,
    contactoTelefonico,
    idade,
    olhos,
    cabelo,
    paisdeorigem,
    altura,
    peso,
    busto,
    tatuagens,
    idiomas,
    tipodeatendimento,
    atendimento,
    concelho_name,
    distrito_name,
    concelho_slug,
    distrito_slug,
    eventos,
    servicos,
    atendea,
    disponibilidade,
    sessaodefotos,
    viajaraconvite,
    visualizacoes,
    cliqueswhatsapp,
    destaquepaginaprincipal,
    destaquenalocalizacao,
    destaqueasnossasescolhas,
    onlineagora,
    webcam,
    deslocacoes,
    apartamento,
    atende24horas,
    atendimentocompleto,
    idanunciante,
    _id,
  } = datapass;

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden will-change-transform">
        <GallerySlider
          uniqueID={`ExperiencesCard_${_id}`}
          ratioClass={ratioClass}
          galleryImgs={imagens}
          href={slug}
          dots={size}
        />
        {size != "small" ? (
          <BtnOnlineAgora
            onlineAgora={onlineagora}
            className="absolute left-3 top-3"
          />
        ) : (
          <></>
        )}
        {destaqueasnossasescolhas && (
          <SaleOffBadge className="absolute left-3 top-3" />
        )}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "py-4 space-y-4" : "py-3 space-y-2"}>
        <div className="space-y-2">
          <div
            className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2"
            style={{ width: "100%", justifyContent: "center" }}
          >
            {size === "default" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span style={{ marginTop: margintp }} className="">
              {concelho_name}, {distrito_name}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <h2
              style={{ width: "100%" }}
              className={` font-medium capitalize ${
                size === "default" ? "text-base" : "text-base"
              }`}
            >
              <span
                className="line-clamp-1"
                style={{ textAlign: "center", marginTop: margintp }}
              >
                {size === "small" && onlineagora === 'sim' ? (
                  <FontAwesomeIcon icon={faCircle} style={{fontSize: '10px', verticalAlign: 'middle', marginTop: '-3px', padding:'2px'}}className="iconOnline" />
                ) : (
                  <></>
                )}
                {nomePerfil}
              </span>
            </h2>
          </div>
        </div>
        <div className="flex justify-between items-center"></div>
      </div>
    );
  };

  return (
    <div
      className={`nc-ExperiencesCard group relative ${className}`}
      data-nc-id="ExperiencesCard"
    >
      {renderSliderGallery()}
      <Link to="#">{renderContent()}</Link>
    </div>
  );
};

export default ExperiencesCard;
