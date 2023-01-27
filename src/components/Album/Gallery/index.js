import { useRouter } from "next/router";
import React, { createElement, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AllPhotos from "./AllPhotos";
import FavouritePhotos from "./FavouritePhotos";
import FeaturedPhotos from "./FeaturedPhotos";
import Style from "./gallery.module.scss";
import LatestPhotos from "./LatestPhotos";

const Gallery = ({ data }) => {
  console.log(data,"data=====")
  const Components = [
    { data: AllPhotos, url: "all_photos" },
    { data: LatestPhotos, url: "latest_photos" },
    { data: FeaturedPhotos, url: "featured_photos" },
    { data: FavouritePhotos, url: "favourite_photos" },
    { data: FavouritePhotos, url: "family_favourite_photos" },
    { data: FavouritePhotos, url: "friends_favourite_photos" },
  ];

  const handleComponents = (component) => {
    if (data ? data[0].url === component.url : "") {
      return React.createElement(component.data);
    }
  };

  return (
    <div className={Style.container}>
      <h1>Gallery</h1>
      <Container>
        {Components.map((component, i) => {
          return <div key={i}>{handleComponents(component)}</div>;
        })}
      </Container>
    </div>
  );
};

export default Gallery;
