import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FavouriteAlbumDetails } from "../../../../../../ImageData";
import FavouriteImageLists from "@/components/FavouriteImageLists";
import Style from "./friends.module.scss";

const Friends = () => {
  
  const getFavImageFunction =()=>{
    let array = FavouriteAlbumDetails.filter((photos) => photos.favourite === 'friends')
    return array
  }

  return (
    <Row>
      <Col>
        <Row className="mt-5">
          <Col >
            <h5>Friends Photos</h5>
          </Col>
        </Row>
        <FavouriteImageLists getFavImageFunction={getFavImageFunction}/> 
      </Col>
    </Row>
  );
};

export default Friends;
