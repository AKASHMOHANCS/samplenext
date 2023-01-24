import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageCard from "../Cards/ImageCard";



const ImageLists = ({data}) => {
  return (
    <Container>
      <Row>
        {data.map((items,i) => {
          return <ImageCard items={items} key={i} />;
        })}
      </Row>
    </Container>
  );
};

export default ImageLists;
