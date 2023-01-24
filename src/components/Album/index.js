import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Gallery from "./Gallery";
import SideNavbar from "./SideNavbar";

const Album = () => {
  
  return (
    <Container> 
      <Row>
        <Col sm={3}>
          <SideNavbar  />
        </Col>
        <Col sm={9}>
          <Gallery  />
        </Col>
      </Row>
    </Container>
  )
};

export default Album;
