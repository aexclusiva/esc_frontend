import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import GuestsInput, { GuestsInputProps } from "./GuestsInput";
import { FocusedInputShape } from "react-dates";
import StayDatesRangeInput from "./StayDatesRangeInput";
import moment from "moment";
import { FC } from "react";
import ButtonSubmit from "./ButtonSubmit";
import { PathName } from "routers/types";
import LocationInputDistrito from "./LocationInputDistrito";
import LocationInputConcelho from "./LocationInputConcelho";
import axios, { AxiosResponse } from "axios";

const urlbackend = process.env.REACT_APP_BACKEND_API_URL;
const endpointObterDistritos = "/localizacoes/distritos/";
const endpointObterdoDistritoporSlug = "/localizacoes/concelhos/porslug/";

export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface StaySearchFormProps {
  haveDefaultValue?: boolean;
  hasButtonSubmit?: boolean;
  buttonSubmitHref?: PathName;
}

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "Lisboa";
const defaultLocationslug = "lisboa";
const defaultDateRange = {
  startDate: moment(),
  endDate: moment().add(4, "days"),
};
const defaultGuestValue: GuestsInputProps["defaultValue"] = {
  guestAdults: 2,
  guestChildren: 2,
  guestInfants: 1,
};

const StaySearchForm: FC<StaySearchFormProps> = ({
  hasButtonSubmit = true,
  haveDefaultValue = false,
  buttonSubmitHref = "/listing-stay-map",
}) => {
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [locationInputValue, setLocationInputValue] = useState("");
  const [locationdefaultslug, setlocationdefaultslug] = useState("");
  const [locationConcelhoInputValue, setLocationConcelhoInputValue] =
    useState("");
  const [locationConcelhodefaultslug, setlocationconcelhodefaultslug] =
    useState("");
  const [guestValue, setGuestValue] = useState({});

  const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(
    null
  );

  const [distritos, setDistritos] = useState<string[]>([]);
  const [concelhos, setConcelhos] = useState<string[]>([]);

  const [searchEndpointPrefix, setsearchEndpointPrefix] = useState<string>("?");

  //
  useEffect(() => {
    if (haveDefaultValue) {
      setDateRangeValue(defaultDateRange);
      setLocationInputValue(defaultLocationValue);
      setlocationdefaultslug(defaultLocationslug);
      setLocationConcelhoInputValue(defaultLocationValue);
      setlocationconcelhodefaultslug(defaultLocationslug);
      setGuestValue(defaultGuestValue);
    }
  }, []);
  //

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get(urlbackend + endpointObterDistritos)
      .then((response: AxiosResponse<any>) => {
        setDistritos(response.data);
      });
  }, []);

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    if (locationdefaultslug.length > 2) {
      axios
        .get(urlbackend + endpointObterdoDistritoporSlug + locationdefaultslug)
        .then((response: AxiosResponse<any>) => {
          setConcelhos(response.data);
        });
    }
  }, [locationdefaultslug]);

  //Atualizar url de pesquisa final
  useEffect(() => {
    const updateFilters = async () => {
      let temp = "?";
      setsearchEndpointPrefix("?");
      if (locationdefaultslug) {
        temp = temp + "&" + "distrito=" + locationdefaultslug;
      }
      if (locationConcelhodefaultslug) {
        temp = temp + "&" + "concelho=" + locationConcelhodefaultslug;
      }
      setsearchEndpointPrefix('/acompanhantes-de-luxo/' + temp);
    };
    updateFilters();
  }, [locationdefaultslug, locationConcelhodefaultslug]);

  const renderForm = () => {
    return (
      <form className="w-full relative flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
        <LocationInputDistrito
          defaultValue={locationInputValue}
          defaultValueslug={locationdefaultslug}
          onChange={(e) => {
            setLocationInputValue(e);
            console.log("logationChanged " + e);
          }}
          onChangeSlug={(e) => {
            setlocationdefaultslug(e);
            console.log("slugchanged " + e);
          }}
          onInputDone={() => setDateFocused("startDate")}
          className="flex-[1.5]"
          alldistrict={distritos}
        />
        <LocationInputConcelho
          defaultValue={locationConcelhoInputValue}
          defaultValueslug={locationConcelhodefaultslug}
          onChange={(e) => {
            setLocationConcelhoInputValue(e);
            console.log("logationChanged " + e);
          }}
          onChangeSlug={(e) => {
            setlocationconcelhodefaultslug(e);
            console.log("slugchanged " + e);
          }}
          onInputDone={() => setDateFocused("startDate")}
          className="flex-[1.5]"
          allconcelhos={concelhos}
        />
        <div className="mt-4">
          {hasButtonSubmit && (
            <div className="pr-2 xl:pr-4">
              <ButtonSubmit href={searchEndpointPrefix} />
              
            </div>
          )}
        </div>
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
