import Link from "next/link";
import React from "react";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Style from "./header.module.scss";

const Header = ({ props }) => {
  return (
    <div className={Style.container}>
      <Navbar collapseOnSelect expand="lg" className={`${Style.navbar}`}>
        <Navbar.Brand>
          {" "}
          <Link href="/" className={Style.brand}>
            Next.js
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />

          <nav className="d-flex justify-content-end w-75">
            {props?.menu?.map((values, index) => {
              return (
                <Link
                  // style={navLinkStyles}
                  href={values.link}
                  className={Style.navlinks}
                  key={index}
                >
                  {values.title}
                </Link>
              );
            })}

            {/* {!isLoggedIn ? (
                <>
                  <Link
                   // style={navLinkStyles}
                    href={"Register"}
                    className={Style.navlinks}
                  >
                    Register
                  </Link>
                  <Link
                    //style={navLinkStyles}
                    href={"login"}
                    className={Style.navlinks}
                  >
                    Login
                  </Link>
                </>
              ) : null}

              {isLoggedIn ? (
                <>
                  <span className={Style.username}> Welcome {username} !</span>
                  <button
                    className={` ${Style.logout}`}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </button>
                </>
              ) : null} */}
          </nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
