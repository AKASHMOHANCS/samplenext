import FavouriteImageLists from "@/components/FavouriteImageLists";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import { FavouriteAlbumDetails } from "../../../../../../ImageData";


import Style from "./family.module.scss";

const Family = () => {

  const getFavImageFunction =()=>{
    let array = FavouriteAlbumDetails.filter((photos) => photos.favourite === 'family')
    return array
  }

  return (
    <Row>
      <Col>
        <Row className="mt-5">
          <Col>
            <h5>Family Photos</h5>
          </Col>
        </Row>
        <FavouriteImageLists getFavImageFunction={getFavImageFunction} />
      </Col>
    </Row>
  );
};

export default Family;
