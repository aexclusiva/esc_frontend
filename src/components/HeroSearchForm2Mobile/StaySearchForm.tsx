import { UsersIcon } from "@heroicons/react/24/outline";
import axios, { AxiosResponse } from "axios";
import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GuestsInput, { GuestsObject } from "./GuestsInput";
import LocationInput from "./LocationInput";
import StayDatesRangeInput from "./StayDatesRangeInput";

const StaySearchForm = () => {
  //
  const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
  const endpointObterDistritosMaisRequisitados5 =
    "/localizacoes/distritos/maisanuncios";

  const [distritos, setDistritos] = useState<string[]>([]);

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get(urlbackend + endpointObterDistritosMaisRequisitados5)
      .then((response: AxiosResponse<any>) => {
        setDistritos(response.data);
      });
  }, []);

  const [fieldNameShow, setFieldNameShow] = useState<
    "location" | "dates" | "guests"
  >("location");
  //
  const [locationInputTo, setLocationInputTo] = useState("");
  const [guestInput, setGuestInput] = useState<GuestsObject>({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
  });
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });

  const renderInputLocation = () => {
    const isActive = fieldNameShow === "location";
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("location")}
          >
            <span className="text-neutral-400">Where</span>
            <span>{locationInputTo || "Location"}</span>
          </button>
        ) : (
          <LocationInput
            defaultValue={locationInputTo}
            alldistrict={distritos}
            onChange={(value) => {
              setLocationInputTo(value);
              //setFieldNameShow("dates");
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full space-y-5">
        {/*  */}
        {renderInputLocation()}
        {/*  */}
        <div
          className="w-full bg-white dark:bg-neutral-800 
            rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        >
          <div className="p-5">
            <Link reloadDocument to="/registo">
            <span className="block font-semibold text-xl sm:text-2xl">
              ANUNCIAR
            </span>
            </Link>
          </div>
          <div className="p-5">
            <Link to="/entrar" reloadDocument>
            <span className="block font-semibold text-xl sm:text-2xl">
              ÁREA RESERVADA
            </span>
            </Link>
          </div>
          <div className="p-5">
            
          <Link to="/termos-e-condicoes" reloadDocument>
            <span className="block font-semibold text-xl sm:text-2xl">
              TERMOS E CONDIÇÕES
            </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaySearchForm;
