import React from "react";
import About1 from "./About1/About1";
import AboutSection from "./AboutSection";
import Contact1 from "./Contact1/Contact1";
import ContactSection from "./ContactSection";
import Gallery from "./Album";
import HomeBanner from "./HomeBanner";
import HomeContent from "./HomeContent";
import CommonLayout from "./Layouts/CommonLayout";
import Login from "./Login";
import Portfolio1 from "./Portfolio1/Portfolio1";
import PortfolioSection from "./PortfolioSection";
import Signup from "./SignUp";
import Album from "./Album";
import AllPhotos from "./Album/Gallery/AllPhotos";
import LatestPhotos from "./Album/Gallery/LatestPhotos";
import FeaturedPhotos from "./Album/Gallery/FeaturedPhotos";
import FavouritePhotos from "./Album/Gallery/FavouritePhotos";
import AllFavouritePhotos from "./Album/Gallery/FavouritePhotos/AllFavouritePhotos";
import Family from "./Album/Gallery/FavouritePhotos/Family";
import Friends from "./Album/Gallery/FavouritePhotos/Friends";


const Components = {
  common_layout: CommonLayout,
  home_banner: HomeBanner,
  home_content:HomeContent,
  about:AboutSection,
  contact:ContactSection,
  portfolio:PortfolioSection,
  about_1:About1,
  contact_1:Contact1,
  portfolio_1:Portfolio1,
  login:Login,
  register:Signup,
  //gallery:Album,
  all_photos:AllPhotos,
  latest_photos:LatestPhotos,
  featured_photos:FeaturedPhotos,
  favourite_photos:FavouritePhotos,
  all_favourite_photos : AllFavouritePhotos,
  family_favourite_photos : Family,
  friends_favourite_photos:Friends

};

const ComponentFunc = (block) => {
  if (typeof Components[block.url] !== "undefined") {
    return React.createElement(Components[block.url], {
      key: Math.random(),
      props: block.data,
    });
  }
  return React.createElement(() => <div></div>, { key: Math.random() });
};
export default ComponentFunc;
