import React from "react";
import { Row, Col } from "react-bootstrap";
import {FeaturedAlbumDetails} from '../../../../../ImageData'
import ImageLists from "../../../ImageLists";
import Style from "./featuredPhotos.module.scss";

const FeaturedPhotos = () => {
  return (
    <Row>
      <Col>
        <Row className="mt-3">
          <Col>
            <h5>Featured Photos</h5>
          </Col>
        </Row>
        < ImageLists data={FeaturedAlbumDetails} />
      </Col>
    </Row>
  );
};

export default FeaturedPhotos;
