import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect, useRef, FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  onClick?: () => void;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  headingText?: string;
  alldistrict?: any;
}

const LocationInput: FC<Props> = ({
  onChange = () => {},
  className = "",
  defaultValue = "United States",
  headingText = "Distrito",
  alldistrict = [""],
}) => {
  const [value, setValue] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

const endpointSearch = "/acompanhantes-de-luxo/?&distrito="

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSelectLocation = (item: string) => {
    // DO NOT REMOVE SETTIMEOUT FUNC
    setTimeout(() => {
      setValue(item);
      onChange && onChange(item);
    }, 0);
  };

  const renderSearchValues = ({
    heading,
    items,
  }: {
    heading: string;
    items: string[];
  }) => {
    return (
      <>
        <p className="block font-semibold text-base">
          {heading || "Destinations"}
        </p>
        <div className="mt-3">
          {items.map((item: any) => {
            return (
              <div
                className="py-2 mb-1 flex items-center space-x-3 text-sm"
                onClick={() => handleSelectLocation(item)}
                key={item}
              >
                <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <span className="">{item}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className={`${className}`} ref={containerRef}>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {headingText}
        </span>

        <p className="block font-semibold text-base">{"Zona de Atendimento"}</p>
        <div className="mt-3">
          {alldistrict.length > 2 &&
            alldistrict.map((item, index) => (
              <div
                className="py-2 mb-1 flex items-center space-x-3 text-sm"
                key={index}
              >
                <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <Link reloadDocument to={endpointSearch + item?.slug_distrito}>
                  {" "}
                  <span className="">{item.nome_distrito}</span>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
