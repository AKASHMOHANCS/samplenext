import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Gallery from "..";
import FeaturedPhotos from "../FeaturedPhotos";
import AllFavouritePhotos from "./AllFavouritePhotos";
import Family from "./Family";
import Style from "./favouritePhotos.module.scss";
import Friends from "./Friends";

const FavouritePhotos = ({ data }) => {
  const router = useRouter();

  const viewFavouritesGallery = () => {
    if (router.query.slug[0] === "favourite_photos" && !router.query.slug[1]) {
      return <AllFavouritePhotos />;
    }
    if (router.query.slug[1] === "family_favourite_photos") {
      return <Family />;
    }
    if (router.query.slug[1] === "friends_favourite_photos") {
      return <Friends />;
    }
  };

  return (
    <Row>
      <Col>
        <Row className="mt-3">
          <Col>
            <h5>Favourite Photos</h5>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  eventKey="link-1"
                  // onClick={() =>
                  //   router.push("favourite_photos", undefined, {
                  //     shallow: true,
                  //   })
                  // }
                  href="favourite_photos/"
                  className="text-dark"
                >
                  {" "}
                  All Photos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  eventKey="link-2"
                  href="favourite_photos/family_favourite_photos"
                  // onClick={() =>
                  //   router.push(
                  //     "favourite_photos/family_favourite_photos",
                  //     undefined,
                  //     { shallow: true }
                  //   )
                  // }
                  className="text-dark "
                >
                  Family
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  eventKey="link-3"
                  href="favourite_photos/friends_favourite_photos"
                  // onClick={() =>
                  //   router.push(
                  //     "favourite_photos/friends_favourite_photos",
                  //     undefined,
                  //     { shallow: true }
                  //   )
                  // }
                  className="text-dark"
                >
                  Friends
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Container>
          {viewFavouritesGallery()}
          {/* <AllFavouritePhotos />
          <Family />
          <Friends /> */}
        </Container>
      </Col>
    </Row>
  );
};

export default FavouritePhotos;
