import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import {FavouriteAlbumDetails} from '../../../../../../ImageData'
import ImageLists from "../../../../ImageLists";
import Style from "./allFavouritePhotos.module.scss";

const AllFavouritePhotos = () => {

  
  return (
    <Row>
      <Col>
        <Row className="mt-5">
          <Col>
            <h5>All Photos</h5>
          </Col>
        </Row>
        < ImageLists data={FavouriteAlbumDetails} />
     
      </Col>
    </Row>
  );
};

export default AllFavouritePhotos;
