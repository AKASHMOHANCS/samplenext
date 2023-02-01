import ComponentFunc from "@/components";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { useRouter } from "next/router";
import React, { createElement, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import Style from "./gallery.module.scss";

const Gallery = ({ data }) => {
  return (
    <>
      <CustomBreadcrumb levels={data?.data?.levels} />
      <div className={Style.container}>
        <h1>Gallery</h1>
        <Container>
          {data?.data?.widgets?.map((block) => ComponentFunc(block))}
        </Container>
      </div>
    </>
  );
};

export default Gallery;
