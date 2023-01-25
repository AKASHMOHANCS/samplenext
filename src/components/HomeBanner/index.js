import { ContextProvider } from "@/Context/Context";
import React from "react";
import { useContext } from "react";

const HomeBanner = ({ props }) => {

  const { message1 } = useContext(ContextProvider);

  return <div style={{padding:'20%'}}>HomeBanner  - {message1}</div>;
};

export default HomeBanner;
