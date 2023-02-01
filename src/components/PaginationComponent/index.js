import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import Style from "./paginationComponent.module.scss";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { getPaginateData } from "lib/pages";
import { useDispatch, useSelector } from "react-redux";
import { setPaginationData } from "@/Store/authSlice";

const PaginationComponent = ({ slug }) => {
  const [message, setMessage] = useState();
  const { paginationData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onPagination = async (page) => {
    try {
      getPaginateData("form-submit", page, 6).then((response) => {
        if (response?.status == true) {
          dispatch(setPaginationData(response));
        }
      });
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <>
      {paginationData?.total_pages > 1 && (
        <div className={Style.pagination_wrap}>
          <button
            className={`${Style.pagination_prev} ${
              paginationData?.current_page == 1 ? Style.pagination_disabled : ""
            }`}
            onClick={() => {
              onPagination(paginationData?.current_page - 1);
              window.scrollTo({
                top: 800,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <GrLinkPrevious size={15} />
            Prev
          </button>
          {window.innerWidth >= 992 ? (
            <Pagination className={Style.pagination}>
              {[...Array(paginationData?.total_pages)].map((value, index) => {
                return (
                  <Pagination.Item
                    className={Style.pagination_item}
                    active={
                      paginationData?.current_page == index + 1 ? true : false
                    }
                    onClick={() => {
                      onPagination(index + 1);

                      {
                        slug
                          ? window.scrollTo({
                              top: 800,
                              left: 0,
                              behavior: "smooth",
                            })
                          : window.scrollTo({
                              top: 0,
                              left: 0,
                              behavior: "smooth",
                            });
                      }
                    }}
                  >
                    {index + 1}
                  </Pagination.Item>
                );
              })}
            </Pagination>
          ) : (
            <div className="text-center">
              Page - {paginationData?.current_page.toString().padStart(2, "0")}
            </div>
          )}
          <button
            className={`${Style.pagination_next}  ${
              paginationData?.current_page == paginationData?.total_pages
                ? Style.pagination_disabled
                : ""
            }`}
            onClick={() => {
              onPagination(parseInt(paginationData?.current_page) + 1);
              {
                window.scrollTo({
                  top: 800,
                  left: 0,
                  behavior: "smooth",
                });
              }
            }}
          >
            Next
            <GrLinkNext size={15} />
          </button>
        </div>
      )}
    </>
  );
};

export default PaginationComponent;
