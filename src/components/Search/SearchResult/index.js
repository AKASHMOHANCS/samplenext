import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
//import BrochureCard from "../../BrochureCard";
//import NewsCard from "../../NewsCard";
//import ProjectImage from "../../ProjectListCard";
import Style from "./SearchResult.module.scss";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Pagination from "../../Pagination/Pagination";
import { useFormik } from "formik";
import * as Yup from "yup";
//import { postContent } from "../../../../lib/pages";
import GoogleRecaptcha from "../../GoogleRecaptcha";
import NewsCard from "@/components/NewsCard";


const SearchResult = ({ result, searchTerm, count, handleModal }) => {
  const [show, setShow] = useState(false);
  const download_btn= useRef(null);
  const [nonce, setNonce] = useState();
  const [token, setToken] = useState("");
  const ITEMS_PER_PAGE1= 5;
  const ITEMS_PER_PAGE2= 6;
  const ITEMS_PER_PAGE3= 8;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [currentPage4, setCurrentPage4] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState();
  const [formSubmitted, setFormSubmitted] = useState(false);



  // useEffect(() => {
  //   postContent("create-nonce", "")
  //     .then((response) => {
  //       setNonce(response);
  //     });
  // }, []);


  return (
    <div className={Style.results}>
      <div className="container">
        <p className={Style.results_count}>
          {" "}
          {searchTerm != ""
            ? count != 0 && `${count} results found`
            : ""}
        </p>
        <div className={Style.results_tab}>
          <Tabs
            defaultActiveKey="company"
            id="uncontrolled-tab-example"
            className={Style.tabs}
          >
              
            {searchTerm &&
              result?.map((value, index) => (
              
                <Tab eventKey={value?.type} title={value?.title} key={index}>
                  {value?.type == "company" ? (
                    <>
                      <div className="row row-cols-lg-1" key={index}>
                        {value?.data ? (
                          value?.data
                            ?.slice(
                              (currentPage1 - 1) * ITEMS_PER_PAGE1,
                              (currentPage1 - 1) * ITEMS_PER_PAGE1 + ITEMS_PER_PAGE1
                            )
                            .map((item, key) => (
                              <Link href={item?.link} key={key}>
                                <div onClick={handleModal}>
                                  
                                  <NewsCard props={item} />
                                </div>
                              </Link>
                            ))
                        ) : (
                          <div className={Style.results_notfound}>
                            <h5>
                              No result found <span>"{searchTerm}"</span>
                            </h5>
                            <p>Try with different key word.</p>
                          </div>
                        )}
                      </div>
                      {value?.data?.length > ITEMS_PER_PAGE1 && (
                        <div className="text-center">
                          <Pagination
                            total={value?.data?.length}
                            itemsPerPage={ITEMS_PER_PAGE1}
                            currentPage={currentPage1}
                            onPageChange={(page) => setCurrentPage1(page)}
                          />
                        </div>
                      )}
                    </>
                  ) : value?.type == "projects" ? (
                    <>
                      <div className={`row row-cols-lg-3 ${Style.row}`}>
                        {value?.data ? (
                          value?.data
                            ?.slice(
                              (currentPage2 - 1) * ITEMS_PER_PAGE2,
                              (currentPage2 - 1) * ITEMS_PER_PAGE2 + ITEMS_PER_PAGE2
                            )
                            .map((item, key) => (
                              <div key={key} onClick={handleModal}>
                                {/* <ProjectImage
                                  link={item?.link}
                                  innerContent={item?.specifications}
                                  image={item?.image}
                                  name={item.title}
                                  location={item?.place}
                                /> */}
                              </div>
                            ))
                        ) : (
                          <div className={Style.results_notfound}>
                            <h5>
                              No result found <span>{searchTerm}</span>
                            </h5>
                            <p>Try with different key word.</p>
                          </div>
                        )}
                      </div>
                      {value?.data?.length > ITEMS_PER_PAGE2 && (
                        <div className="text-center">
                          <Pagination
                            total={value?.data?.length}
                            itemsPerPage={ITEMS_PER_PAGE2}
                            currentPage={currentPage2}
                            onPageChange={(page) => setCurrentPage2(page)}
                          />
                        </div>
                      )}
                    </>
                  ) : value?.type == "articles" ? (
                    <>
                      <div className="row row-cols-lg-1">
                        {value?.data ? (
                          value?.data
                            ?.slice(
                              (currentPage3 - 1) * ITEMS_PER_PAGE1,
                              (currentPage3 - 1) * ITEMS_PER_PAGE1 + ITEMS_PER_PAGE1
                            )
                            ?.map((item, index) => (
                              <Link href={item?.link} key={index}>
                                <div onClick={handleModal}>
                                  {/* <NewsCard props={item} /> */}
                                </div>
                              </Link>
                            ))
                        ) : (
                          <div className={Style.results_notfound}>
                            <h5>
                              No result found <span>{searchTerm}</span>
                            </h5>
                            <p>Try with different key word.</p>
                          </div>
                        )}
                      </div>
                      {value?.data?.length > ITEMS_PER_PAGE1 && (
                        <div className="text-center">
                          <Pagination
                            total={value?.data?.length}
                            itemsPerPage={ITEMS_PER_PAGE1}
                            currentPage={currentPage3}
                            onPageChange={(page) => setCurrentPage3(page)}
                          />
                        </div>
                      )}
                    </>
                  ) : value?.type == "brochures" ? (
                    <>
                      <div className="row row-cols-lg-4">
                        {value?.data ? (
                          value?.data
                            ?.slice(
                              (currentPage4 - 1) * ITEMS_PER_PAGE3,
                              (currentPage4 - 1) * ITEMS_PER_PAGE3 + ITEMS_PER_PAGE3
                            )
                            ?.map((item, index) => (
                              <div
                                onClick={() => {
                                  setCat(item)
                                  handleShow();
                                }}
                                key={index}
                              >
                                {/* <BrochureCard props={item} />{" "} */}
                              </div>
                            ))
                        ) : (
                          <div className={Style.results_notfound}>
                            <h5>
                              No result found <span>{searchTerm}</span>
                            </h5>
                            <p>Try with different key word.</p>
                          </div>
                        )}
                      </div>
                      
                        {value?.data?.length > ITEMS_PER_PAGE3 && <div className="text-center">
                          <Pagination
                            total={value?.data?.length}
                            itemsPerPage={ITEMS_PER_PAGE3}
                            currentPage={currentPage4}
                            onPageChange={(page) => setCurrentPage4(page)}
                          />
                        </div>}
                    </>
                  ) : (
                    ""
                  )}
                </Tab>
               
              ))}
          </Tabs>
        </div>

      </div>
     
    </div>
  );
};

export default SearchResult;
