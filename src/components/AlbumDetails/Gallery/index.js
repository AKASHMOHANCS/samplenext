import ComponentFunc from "@/components";
import { useRouter } from "next/router";
import React, { createElement, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import Style from "./gallery.module.scss";


const Gallery = ({ data }) => {
  return (
    <div className={Style.container}>
      <h1>Gallery</h1>
      <Container>
        {data?.data?.widgets?.map((block) => ComponentFunc(block))}
      </Container>
    </div>
  );
};

export default Gallery;
