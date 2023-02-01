import React from "react";
import Image from "next/image";
import Ratio from "react-bootstrap/Ratio";
import Popover from "react-bootstrap/Popover";
import Style from "./ProjectListCard.module.scss";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Link from "next/link";
import { useRouter } from "next/router";
import Assets from "../Layouts/CommonLayout/assets";
import { useWindowSize } from "@/helpers/windowDimensions";

const ProjectListCard = (props) => {
  // console.log(props, "list card =======");
  const { width } = useWindowSize()
  const router = useRouter();


  const popoverPlacement = (left) => {
    let leftPercent = Number(left.split("%")[0]);
    if (leftPercent > 50) {
      return "left";
    } else {
      return "right";
    }
  };

  return (
    <Link href={props?.link ? props?.link : ""}>
      <div className={Style.wrap}>
        <div
          className={`position-relative ${
            props?.imageOnly ? Style.project_card_wrp_imageOnly : ""
          } ${Style.project_card_wrp} ${props?.className}`}
        >
          <Ratio
            aspectRatio={
              props?.landscape
                ? 870 / 1920
                : props?.imageOnly
                ? 633 / 1302
                : 416 / 634
            }
            className={Style.proj_img_wrp}
          >
            <Image
              priority={true}
              src={Assets.project_img_1}
              fill
              style={{ objectFit: "cover" }}
              alt=""
            />
          </Ratio>
          {width >= 992 ?
          props?.innerContent?.map((popover, id) => {
            return (
              <OverlayTrigger
                key={id}
                trigger={["hover", "focus"]}
                placement={popoverPlacement(popover?.left ? popover?.left : "")}
                overlay={
                  <Popover
                    id={`popover-${id}`}
                    className={Style.project_popover}
                  >
                    <Popover.Body className="d-flex align-items-start">
                      <div className="flex-shrink-0">
                        <Image
                           priority={true}
                          src={Assets.project_img_1}
                          width={52}
                          height={52}
                          alt=""
                        ></Image>
                      </div>
                      <div className="flex-grow-1 ps-2 ms-1">
                        <h5 className="fs-15 mb-2">{popover.title}</h5>
                        <p className="mb-0 mb-2">{popover.description}</p>
                      </div>
                    </Popover.Body>
                  </Popover>
                }
              >
                <span
                  className={`${Style.project_inner_btn} bg-white rounded-circle position-absolute`}
                  style={{
                    left: popover?.left ? popover?.left : "",
                    top: popover?.top ? popover?.top : "",
                  }}
                >
                  +
                </span>
              </OverlayTrigger>
            );
          }):""}

          {props?.landscape ? (
            <div className={`${Style.project_landscape} project-landscape`}>
              <div className="container">
                <div className={Style.project_landscape_content}>
                  <h4>PROJECT</h4>
                  <h5>{props?.name}</h5>
                  <p>{props?.location}</p>
                  {router.asPath == "/portfolio" && (
                    <Link href={props.link ?? ""}>
                      <a className={`btn btn-link text-white ${Style.btn}`}>
                        Know More
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {props?.landscape ? (
          ""
        ) : props?.name ? (
          <>
            <p
              className={`text-secondary mt-lg-4 mt-1 pt-2 mb-lg-2 mb-1 fs-4 ${Style.font}`}
            >
              {props?.location}
            </p>
            <h5 className="h5 fs-25 mb-0 fw-medium text-black">
              {props?.name}
            </h5>
          </>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
};

export default ProjectListCard;
