import React, { FC, useState } from "react";
import ExperiencesSearchForm from "./ExperiencesSearchForm";
import StaySearchForm from "./StaySearchForm";
import RentalCarSearchForm from "./RentalCarSearchForm";
import FlightSearchForm from "./FlightSearchForm";

export type SearchTab = "Stays" | "Experiences" | "Cars" | "Flights";

export interface HeroSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: "Stays" | "Experiences" | "Cars" | "Flights";
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentTab = "Stays",
  currentPage,
}) => {
  const tabs: SearchTab[] = ["Stays", "Experiences", "Cars", "Flights"];
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

  const renderTab = () => {
    return (
    <></>
    )
  };

  const renderForm = () => {
    const isArchivePage = !!currentPage && !!currentTab;
    return <StaySearchForm haveDefaultValue={isArchivePage} />;
  };

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-4xl py-5 lg:py-0 ${className}`}
      data-nc-id="HeroSearchForm"
    >
      {renderTab()}
      {renderForm()}
    </div>
  );
};

export default HeroSearchForm;
