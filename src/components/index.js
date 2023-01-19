import React from "react";
import About1 from "./About1/About1";
import AboutSection from "./AboutSection";
import Contact1 from "./Contact1/Contact1";
import ContactSection from "./ContactSection";
import HomeBanner from "./HomeBanner";
import HomeContent from "./HomeContent";
import CommonLayout from "./Layouts/CommonLayout";
import Portfolio1 from "./Portfolio1/Portfolio1";
import PortfolioSection from "./PortfolioSection";


const Components = {
  common_layout: CommonLayout,
  home_banner: HomeBanner,
  home_content:HomeContent,
  about:AboutSection,
  contact:ContactSection,
  portfolio:PortfolioSection,
  about_1:About1,
  contact_1:Contact1,
  portfolio_1:Portfolio1

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
