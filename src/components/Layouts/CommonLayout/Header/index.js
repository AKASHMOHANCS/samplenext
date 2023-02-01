import Link from "next/link";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Style from "./header.module.scss";
import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, setIsLoggedIn } from "@/Store/authSlice";
import Modal from "react-bootstrap/Modal";
import { AiOutlineSearch } from 'react-icons/ai';
import Search from "@/components/Search";

const Header = ({ props }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  const handleCloseModal = () => {
    setShow(false);
    // handleClose();
  };
  const handleShowModal = () => setShow(true);

  // const isLoggedIn = useSelector(selectIsLoggedIn); // updated

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
        <div className="nav-item ms-auto  order-lg-2">
          <button
            className={`btn btn-transparent ${Style.search_btn} px-2`}
            onClick={handleShowModal}
          >
            <AiOutlineSearch size={30} className="mx-5" />
          </button>
        </div>
      </Navbar>

      <Modal
        fullscreen
        show={show}
        className={Style.modal}
        onHide={handleCloseModal}
      >
        <Modal.Body className="p-0">
          <Search modalClose={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;
