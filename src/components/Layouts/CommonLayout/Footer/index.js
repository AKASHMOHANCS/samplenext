import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import { TiSocialYoutube } from "react-icons/ti";
import Style from './footer.module.scss'
import Link from 'next/link';

const Footer = ({props}) => {
  return (
    <div className={`${Style.Layoutfooter}`}>
    <Container>
      <Row className="justify-content-center pt-4 pb-4">
        <Col lg={3} className="pt-4">
          <Link className={Style.navlinks} href="help">Help</Link> 
          <Link className={Style.navlinks} href="about">About us</Link>
          <Link className={Style.navlinks} href="contact">Contact us</Link>
          <Link className={Style.navlinks} href="privacy-policy">Privacy Policy</Link>
        </Col>
        <Col lg={3} className="pt-4">
          <h5>JOIN THE NEWSLETTER</h5>
          <p className={Style.newsletterText}>
            Get the freshest reviews, news, and more delivered right to your
            inbox!
          </p>
          <button className={Style.newsletterButton}>
            JOIN THE NEWSLETTER
          </button>
        </Col>
        <Col lg={3} className="pt-4">
          <h5>FOLLOW US</h5>
          <span className="pe-3">
            {" "}
            <SlSocialInstagram />
          </span>
          <span className="pe-2">
            <SlSocialTwitter />
          </span>
          <span className="pe-2">
            {" "}
            <SlSocialFacebook />
          </span>
          <span className="pe-2">
            {" "}
            <TiSocialYoutube />
          </span>
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default Footer