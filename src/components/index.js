import React from "react";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import HomeBanner from "./HomeBanner";
import HomeContent from "./HomeContent";
import CommonLayout from "./Layouts/CommonLayout";
import PortfolioSection from "./PortfolioSection";


const Components = {
  common_layout: CommonLayout,
  home_banner: HomeBanner,
  home_content:HomeContent,
  about:AboutSection,
  contact:ContactSection,
  portfolio:PortfolioSection

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
