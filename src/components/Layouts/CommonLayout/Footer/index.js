import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import { TiSocialYoutube } from "react-icons/ti";
import Style from "./footer.module.scss";
import Link from "next/link";
import { useWindowSize } from "@/helpers/windowDimensions";
import { AiOutlineArrowRight } from "react-icons/ai";
import { addNewsLetter, fetchNewsLetter } from "lib/pages";

const Footer = ({ props }) => {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { width } = useWindowSize();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(e.target.value) === false) {
      setErrorMsg("Invalid Email");
    } else {
      setErrorMsg("");
    }
  };

  const subscribe = async (e) => {
    e.preventDefault();
    if (!errorMsg) {
      try {
        let obj = {
          newsletter_email: email,
        };

        addNewsLetter("newsletter", obj).then((response) => {
          if (response.data.status) {
            setEmail("");
            setMessage("You are now subscribed to the newsletter.");
          } else {
            setEmail("");
            setMessage("Already registered");
          }
        });
      } catch (error) {
        setErrorMsg(error);
      }
      setTimeout(() => {
        setMessage("");
      }, "3600");
    }
  };

  return (
    <div className={`${Style.Layoutfooter}`}>
      <Container>
        <Row className="justify-content-center pt-4 pb-4">
          <Col lg={3} className="pt-4">
            <Link className={Style.navlinks} href="help">
              Help
            </Link>
            <Link className={Style.navlinks} href="about">
              About us
            </Link>
            <Link className={Style.navlinks} href="contact">
              Contact us
            </Link>
            <Link className={Style.navlinks} href="privacy-policy">
              Privacy Policy
            </Link>
          </Col>
          <Col lg={3} className="pt-4">
            {/* <h5>JOIN THE NEWSLETTER</h5>
          <p className={Style.newsletterText}>
            Get the freshest reviews, news, and more delivered right to your
            inbox!
          </p>
          <button className={Style.newsletterButton}>
            JOIN THE NEWSLETTER
          </button> */}
            <form
              onSubmit={subscribe}
              className={width >= 992 ? `ms-auto` : `pt-5 flex-grow-1 w-100`}
            >
              <div className="form-group position-relative">
                <label className="form-label fs-14 fw-medium text-white text-uppercase mb-md-4 mb-3">
                  {props?.newsletter?.title}
                </label>
                <div className="d-flex">
                  <input
                    required
                    value={email}
                    className={`form-control rounded-pill me-3 ${Style.subscribe_input}`}
                    placeholder="your@email.com"
                    id="email-input"
                    name="email"
                    onChange={handleEmail}
                  />

                  <button
                    className={`btn rounded-circle btn-secondary flex-lg-shrink-0  d-flex justify-content-center align-items-center ${Style.subscribe_button}`}
                    type="submit"
                  >
                    <AiOutlineArrowRight
                      size={16}
                      color="white"
                      className="flex-shrink-0"
                    />
                  </button>
                </div>

                {errorMsg && (
                  <div className={Style.errorMessage}>{errorMsg}</div>
                )}
                {message && <div className={Style.success}>{message}</div>}
              </div>
            </form>
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
  );
};

export default Footer;
