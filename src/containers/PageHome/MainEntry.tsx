import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "./SectionVideos";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";

const Locations: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "New Yourk",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Singapore",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Paris",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "London",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Tokyo",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Maldives",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

function MainEntry() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        <SectionHero className="lg:pt-16 lg:pb-16" />

        {/* SECTION 1 */}
        {/* <SectionSliderNewCategories
          categories={Locations}
          uniqueClassName="PageHome_s1"
        /> */}
      </div>
    </div>
  );
}

export default MainEntry;
