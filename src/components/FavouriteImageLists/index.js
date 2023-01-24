import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageCard from "../Cards/ImageCard";



const FavouriteImageLists = ({ getFavImageFunction }) => {
  
  return (
    <Container>
      <Row>
        {getFavImageFunction()?.map((items, i) => {
          return <ImageCard items={items} key={i} />;
        })}
      </Row>
    </Container>
  );
};

export default FavouriteImageLists;
