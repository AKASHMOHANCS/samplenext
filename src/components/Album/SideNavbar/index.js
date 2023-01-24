import React, { useState } from "react";
import Style from "./sideNavbar.module.scss";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { MdOutlinePhoto } from "react-icons/md";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Link from "next/link";

const SideNavbar = () => {

  const [isOpenSideNav, setopenSideNav] = useState(true);

  const toggleOpen = () => {
    setopenSideNav(!isOpenSideNav);
  };

  

  const SIDE_NAV_DATA = [
    {
      id: 0,
      icon: <MdOutlinePhoto />,
      text: "All Photos",
      link: "",
    },
    {
      id: 1,
      icon: <MdOutlinePhoto />,
      text: "Latest Photos",
      link: "latest_photos",
    },
    {
      id: 2,
      icon: <MdOutlinePhoto />,
      text: "Featured Photos",
      link: "featured_photos",
    },
    {
      id: 2,
      icon: <MdOutlinePhoto />,
      text: "Favourite Photos",
      link: "favourite_photos",
    },
  ];

  return (
    <div
      className={
        isOpenSideNav
          ? `${Style.sidenav} ${Style.sticky}`
          : `${Style.sidenavClosed} ${Style.sticky}`
      }
    >
      <button className={Style.menuBtn} onClick={() => toggleOpen()}>
        {isOpenSideNav ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </button>
      {SIDE_NAV_DATA.map((item, i) => {
        return (
          <OverlayTrigger
            key={i}
            placement="right"
            overlay={
              <Tooltip id={`tooltip-right`}>
                {!isOpenSideNav ? item.text : ""}
              </Tooltip>
            }
          >
            <Link
              key={item.id}
              className={
                isOpenSideNav ? Style.sideitemOpen : Style.sideitemClosed
              }
              href={item.link}
            >
              {item.icon}
              <span
                className={
                  isOpenSideNav ? Style.linkText : Style.linkTextClosed
                }
              >
                {item.text}
              </span>
            </Link>
          </OverlayTrigger>
        );
      })}
    </div>
  );
};

export default SideNavbar;
