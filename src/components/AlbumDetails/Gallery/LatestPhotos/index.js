import React from "react";
import { Row, Col } from "react-bootstrap";
import {LatestAlbumDetails} from '../../../../../ImageData'
import ImageLists from "../../../ImageLists";
import Style from "./latestPhotos.module.scss";

const LatestPhotos = () => {
  return (
    <Row>
      <Col>
        <Row className="mt-3">
          <Col>
            <h5>Latest Photos</h5>
          </Col>
        </Row>
        < ImageLists data={LatestAlbumDetails} />
      </Col>
    </Row>
  );
};

export default LatestPhotos;
