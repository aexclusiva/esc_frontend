import React, { FC, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { AcompanhanteDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface BtnLikeIconProps {
  className?: string;
  colorClass?: string;
  onlineAgora?: string;
  destaquepaginaprincipal?: boolean;
  text?: string;
  location?: boolean;
  full?: boolean;
  veranuncio?: boolean;
  acompanhante?: AcompanhanteDataType;
}

const BtnOnlineAgora: FC<BtnLikeIconProps> = ({
  className = "",
  colorClass = "text-white bg-black bg-opacity-60 hover:bg-opacity-80",
  onlineAgora = "nao",
  destaquepaginaprincipal = false,
  text = "",
  location = false,
  veranuncio = false,
  full = false,
  acompanhante,
}) => {
  const [likedState, setLikedState] = useState(onlineAgora);

  if (onlineAgora === "sim" && !full) {
    return (
      <div
        className={`nc-BtnLikeIcon w-36 h-8 flex items-center justify-center rounded-full cursor-pointer ${colorClass} ${className}`}
        data-nc-id="BtnLikeIcon"
        title="Save"
      >
        <FontAwesomeIcon icon={faCircle} className="iconOnline" />
        <a className="textOnline">Disponivel</a>
      </div>
    );
  } else if (onlineAgora === "sim" && full) {
    return (
      <div
        className={`nc-BtnLikeIcon w-full h-8 flex items-center rounded-full cursor-pointer ${colorClass} ${className}`}
        data-nc-id="BtnLikeIcon"
        title="Save"
      >
        <FontAwesomeIcon icon={faCircle} className="iconOnline" />
        {text.length > 1 && <a className="textOnline">{text}</a>}
        {text.length < 1 && <a className="textOnline">Disponivel</a>}
      </div>
    );
  } else if (destaquepaginaprincipal) {
    if (location) {
      return (
        <>
          <div
            className={`nc-BtnLikeIcon w-36 h-8 flex items-center justify-center rounded-full cursor-pointer ${colorClass} ${className}`}
          >
            <div data-nc-id="BtnLikeIcon" title="Save">
              <FontAwesomeIcon icon={faLocationDot} className="iconLocation" />
              <a className="title-acompanhante">{text}</a>
            </div>
          </div>
        </>
      );
    } else if (veranuncio) {
      return (
        <>
          <div
            className={`nc-BtnLikeIcon w-36 h-8 flex items-center justify-center rounded-full cursor-pointer ${className}`}
          >
            <ButtonPrimary
              link={"/acompanhantes-de-luxo/" + acompanhante?.slug}
              whatsapp={false}
              veranuncio={true}
            >
              {text}{" "}
            </ButtonPrimary>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className={`nc-BtnLikeIcon w-36 h-8 flex items-center justify-center rounded-full cursor-pointer ${colorClass} ${className}`}
          >
            <div data-nc-id="BtnLikeIcon" title="Save">
              <a className="title-acompanhante">{text}</a>
            </div>
          </div>
        </>
      );
    }
  } else {
    return <></>;
  }
};

export default BtnOnlineAgora;
