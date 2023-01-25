import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Style from "./imageCard.module.scss";
const ImageCard = ({ items }) => {
  return (
    <Col lg={"auto"}>
      <Image
        src={items.image}
        className={Style.imagewidth}
        alt="no image to display"
      />
    </Col>
  );
};

export default ImageCard;
