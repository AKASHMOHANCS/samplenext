import React from "react";
//import About1 from "./About1/About1";
//import AboutSection from "./AboutSection";
//import Contact1 from "./Contact1/Contact1";
//import ContactSection from "./ContactSection";
//import Gallery from "./Album";
//import HomeBanner from "./HomeBanner";
//import HomeContent from "./HomeContent";
//import CommonLayout from "./Layouts/CommonLayout";
//import Login from "./Login";
//import Portfolio1 from "./Portfolio1/Portfolio1";
//import PortfolioSection from "./PortfolioSection";
//import Signup from "./SignUp";
//import Album from "./Album";
// import AllPhotos from "./Album/Gallery/AllPhotos";
// import LatestPhotos from "./Album/Gallery/LatestPhotos";
// import FeaturedPhotos from "./Album/Gallery/FeaturedPhotos";
// import FavouritePhotos from "./Album/Gallery/FavouritePhotos";
// import AllFavouritePhotos from "./Album/Gallery/FavouritePhotos/AllFavouritePhotos";
// import Family from "./Album/Gallery/FavouritePhotos/Family";
// import Friends from "./Album/Gallery/FavouritePhotos/Friends";
import dynamic from "next/dynamic";
import BreadcrumbsComp from "./CustomBreadcrumb";
import CustomBreadcrumb from "./CustomBreadcrumb";

const About1 = dynamic(() => import("./About1/About1"), {
  loading: () => "loading....",
});
const AboutSection = dynamic(() => import("./AboutSection"), {
  loading: () => "loading....",
});
const Contact1 = dynamic(() => import("./Contact1/Contact1"), {
  loading: () => "loading....",
});
const ContactSection = dynamic(() => import("./ContactSection"), {
  loading: () => "loading....",
});
const HomeBanner = dynamic(() => import("./HomeBanner"), {
  loading: () => "loading....",
});
const HomeContent = dynamic(() => import("./HomeContent"), {
  loading: () => "loading....",
});
const CommonLayout = dynamic(() => import("./Layouts/CommonLayout"), {
  loading: () => "loading....",
});
const Login = dynamic(() => import("./Login"), {
  loading: () => "loading....",
});
const Portfolio1 = dynamic(() => import("./Portfolio1/Portfolio1"), {
  loading: () => "loading....",
});
const Signup = dynamic(() => import("./SignUp"), {
  loading: () => "loading....",
});
const Album = dynamic(() => import("./AlbumDetails"), {
  loading: () => "loading....",
});
const Gallery = dynamic(() => import("./AlbumDetails/Gallery"), {
  loading: () => "loading....",
});

const PortfolioSection = dynamic(() => import("./PortfolioSection"), {
  loading: () => "loading....",
});
const AllPhotos = dynamic(() => import("./AlbumDetails/Gallery/AllPhotos"), {
  loading: () => "loading....",
});
const LatestPhotos = dynamic(() => import("./AlbumDetails/Gallery/LatestPhotos"), {
  loading: () => "loading....",
});
const FeaturedPhotos = dynamic(() => import("./AlbumDetails/Gallery/FeaturedPhotos"), {
  loading: () => "loading....",
});
const FavouritePhotos = dynamic(
  () => import("./AlbumDetails/Gallery/FavouritePhotos"),
  { loading: () => "loading...." }
);
const AllFavouritePhotos = dynamic(
  () => import("./AlbumDetails/Gallery/FavouritePhotos/AllFavouritePhotos"),
  { loading: () => "loading...." }
);
const Family = dynamic(() => import("./AlbumDetails/Gallery/FavouritePhotos/Family"), {
  loading: () => "loading....",
});
const Friends = dynamic(
  () => import("./AlbumDetails/Gallery/FavouritePhotos/Friends"),
  { loading: () => "loading...." }
);
const Breadcrumbs = dynamic(
  () => import("./CustomBreadcrumb"),
  { loading: () => "loading...." }
);

const Components = {
  common_layout: CommonLayout,
  home_banner: HomeBanner,
  home_content: HomeContent,
  about: AboutSection,
  contact: ContactSection,
  portfolio: PortfolioSection,
  about_1: About1,
  contact_1: Contact1,
  portfolio_1: Portfolio1,
  login: Login,
  register: Signup,
  //gallery:Album,
  all_photos: AllPhotos,
  latest_photos: LatestPhotos,
  featured_photos: FeaturedPhotos,
  favourite_photos: FavouritePhotos,
  all_favourite_photos: AllFavouritePhotos,
  family_favourite_photos: Family,
  friends_favourite_photos: Friends,
  breadcrumbs:CustomBreadcrumb,
  gallery:Gallery
};

const ComponentFunc = (block) => {
  console.log(block,"block")
  if (typeof Components[block.url] !== "undefined") {
    return React.createElement(Components[block.url], {
      key: Math.random(),
      props: block.data,
    });
  }
  return React.createElement(() => <div></div>, { key: Math.random() });
};
export default ComponentFunc;
