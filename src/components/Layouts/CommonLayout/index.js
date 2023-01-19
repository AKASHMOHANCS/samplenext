import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";


const CommonLayout = ({ children, props }) => {
  return (
    <>
      <Header props={props?.header} />
      {children}
      <Footer props={props?.footer} />
    </>
  );
};

export default CommonLayout;

