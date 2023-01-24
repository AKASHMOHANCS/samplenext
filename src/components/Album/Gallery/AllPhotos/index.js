import React from "react";
import { Row, Col } from "react-bootstrap";
import ImageLists from "../../../ImageLists";
import { AlbumDetails } from "../../../../../ImageData";
import Style from "./allPhotos.module.scss";

const AllPhotos = () => {
  return (
    <Row>
      <Col>
        <Row className="mt-3">
          <Col>
            <h5>All Photos</h5>
          </Col>
        </Row>

        <ImageLists data={AlbumDetails} />
      </Col>
    </Row>
  );
};

export default AllPhotos;
