import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { TaxonomyType, StayDataType, AcompanhanteDataType } from "data/types";
import React, { FC, useState, useEffect } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import axios, { AxiosResponse } from "axios";
import SectionGridFilterCardPesquisaResults from "./SectionGridFilterCardPesquisaResults";
import Footer from "shared/Footer/Footer";



export interface PesquisaBarAcompanhantesProps {
  className?: string;
}

//Fazer request api.

const PesquisaBarAcompanhantes: FC<PesquisaBarAcompanhantesProps> = ({
  className = "",
}) => {


  return (
    <div
      className={`nc-ListingExperiencesPage relative overflow-hidden ${className}`}
      data-nc-id="ListingExperiencesPage"
    >
      <Helmet>
        <title>Chisfis || Booking React Template</title>
      </Helmet>
      <BgGlassmorphism />

      <div className="container relative">
        {/* SECTION HERO */}

        {/* SECTION */}
        <SectionGridFilterCardPesquisaResults
          className="pb-24 lg:pb-28"
        />

        {/* SECTION 1 */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore top destination ✈"
            subHeading="Explore thousands of destinations around the world"
            categoryCardType="card4"
            itemPerRow={4}
            categories={DEMO_CATS}
            sliderStyle="style2"
            uniqueClassName="ListingExperiencesPage"
          />
        </div> */}

        {/* SECTION */}
        {/* <SectionSubscribe2 className="py-24 lg:py-28" /> */}
      </div>
    </div>
  );
};

export default PesquisaBarAcompanhantes;
