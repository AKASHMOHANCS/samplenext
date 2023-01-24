import Link from "next/link";
import React from "react";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Style from "./header.module.scss";
import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout, setIsLoggedIn } from "@/Store/authslice";

const Header = ({ props }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  const router = useRouter();

  const handleLogout = () => {
    if (window.confirm("Do you really want to leave?")) {
      try {
        
        localStorage.removeItem("user");
        dispatch(setIsLoggedIn());
   
      } catch (error) {
        // An error happened.
      }
    }
  };

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

          <nav
            className={`d-flex justify-content-between w-75 ${
              status === "loading" ? Style.loading : Style.loaded
            } `}
          >
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

            {!isLoggedIn && (
              <button
                className={Style.navlinks}
                onClick={() => router.push("login")}
              >
                Login
              </button>
            )}
            {isLoggedIn && (
              <button
                className={` ${Style.logout}`}
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            )}
          </nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
