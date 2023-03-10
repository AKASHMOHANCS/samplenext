import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { AiOutlineRight } from "react-icons/ai";
import Style from "./customBreadcrumbs.module.scss";

const CustomBreadcrumb = ({ levels }) => {

  return (
    <>
      <Breadcrumb className={`${Style.custom_breadcrumb} pt-5`} >
        {levels?.map((level, index) => {
          return (
            <React.Fragment key={index}>
              {levels?.length === index + 1 ? (
                <Breadcrumb.Item>
                  <AiOutlineRight size={10} />
                  <span>{level?.title}</span>
                </Breadcrumb.Item>
              ) : (
                <Link href={level.path} style={{ textDecoration: "none" }}>
                  {index !== 0 ? <AiOutlineRight size={10} /> : ""}
                  <span style={{ paddingRight: "5px", paddingLeft: "5px" }}>
                    {" "}
                    {level?.title}
                  </span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default CustomBreadcrumb;

