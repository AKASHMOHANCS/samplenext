import { useEffect, useState } from "react";
import Select from "react-select";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useRef } from "react";
import { getPageContent } from "../../../lib/pages";
import Image from "next/image";
import Assets from "../Layouts/CommonLayout/assets";
import Style from "./portfolio1.module.scss";
import { FaFilter } from "react-icons/fa";
import ProjectListCard from "../ProjectListCard";
import { useWindowSize } from "@/helpers/windowDimensions";

const Portfolio1 = ({ props }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const selectInputRef1 = useRef();
  const selectInputRef2 = useRef();
  const selectInputRef3 = useRef();

  const [projects, setProjects] = useState(props && props?.projects);

  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [project, setProject] = useState("");
  const [companyLabel, setCompanyLabel] = useState("");
  const [productLabel, setProductLabel] = useState("");
  const [projectLabel, setProjectLabel] = useState("");
  const [pageCount, setPageCount] = useState(10);
  const [totalCount, setTotalCount] = useState();
  const [filterButtonVisible, setFilterButtonVisible] = useState(true);

  const handleShowMore = () => {
    setPageCount(pageCount + 10);
  };

  const { width } = useWindowSize();

  useEffect(() => {
    const getData = async () => {
      if (company || product || project || pageCount) {
        const data = await getPageContent(`portfolio_1`);

        // api call should be like this  `portfolio/?product_type=${product}&project_type=${project}&subsidiary=${company}&perpage=${pageCount}`

        setProjects(data?.widgets[0]?.data?.projects);
        setTotalCount(data?.widgets[0]?.data?.count);
      }
    };
    getData();
  }, [company, product, project, pageCount]);

  const handleReset = () => {
    
    selectInputRef1.current.clearValue();
    selectInputRef2.current.clearValue();
    selectInputRef3.current.clearValue();

    setCompany("");
    setProduct("");
    setProject("");
  };

  const filterButtonVisibility = () => {
    if (width < 992) {
      const footerEl = document.querySelector("footer");
      const footerOffset = footerEl.offsetTop;
      const footerHeight = footerEl.clientHeight;
      const windowScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (windowScroll < footerOffset - footerHeight) {
        setFilterButtonVisible(true);
      } else {
        setFilterButtonVisible(false);
      }
    }
  };

  return (
    <section className={`${Style.jg_portfolio_listing} `}>
      {width >= 992 ? (
        <div className={Style.filter}>
          <div className="container">
            <div className="row align-items-end">
              <div className="col">
                <Select
                  ref={selectInputRef1}
                  className="custom-select-wrap"
                  classNamePrefix="custom-select"
                  options={props?.company}
                  onChange={(e) => {
                    setCompany(e?.value);
                  }}
                  placeholder="Subsidiaries"
                />
              </div>
              <div className="col">
                <Select
                  ref={selectInputRef2}
                  className="custom-select-wrap"
                  classNamePrefix="custom-select"
                  options={props?.product_type}
                  onChange={(e) => setProduct(e?.value)}
                  placeholder="Product Type"
                />
              </div>
              <div className="col">
                <Select
                  ref={selectInputRef3}
                  className="custom-select-wrap"
                  classNamePrefix="custom-select"
                  onChange={(e) => setProject(e?.value)}
                  options={props?.project_type}
                  placeholder="Project Type"
                />
              </div>
              <div className={`${Style.reset_sec} col-lg-auto`}>
                <>
                  {company || product || project ? (
                    <>
                      <span className={Style.result}>
                        Filter Results ({totalCount ? totalCount : 0})
                      </span>
                      <a
                        onClick={() => handleReset()}
                        className={`fs-6 d-flex align-items-center ${Style.filter_reset_btn}`}
                      >
                        <button>
                          Reset Filters <span></span>
                        </button>
                      </a>
                    </>
                  ) : (
                    ""
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button
            className={
              filterButtonVisible
                ? `${Style.btn_filter} ${Style.btn_visible}`
                : `${Style.btn_filter}`
            }
            onClick={handleShow}
          >
            {" "}
            <FaFilter size={16} />
            Filter
          </button>

          <Offcanvas
            show={show}
            onHide={handleClose}
            className={Style.offcanvas}
          >
            <Offcanvas.Header
              onClick={() => handleReset()}
              closeButton
              className="justify-content-end"
            ></Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column justify-content-between">
              <div>
                <h3 className="head-sidebar">Find the projects</h3>
                <Select
                  ref={selectInputRef1}
                  className="custom-select-wrap"
                  classNamePrefix="custom-select"
                  options={props?.company}
                  onChange={(e) => {
                    setCompany(e?.value);
                    setCompanyLabel(e?.label);
                  }}
                  placeholder={companyLabel}
                />
                <Select
                  ref={selectInputRef2}
                  className="custom-select-wrap"
                  classNamePrefix="custom-select"
                  options={props?.product_type}
                  onChange={(e) => {
                    setProduct(e?.value);
                    setProductLabel(e?.label);
                  }}
                  placeholder={productLabel ? productLabel : "Product Type"}
                />
                <Select
                  ref={selectInputRef3}
                  className="custom-select-wrap mb-4"
                  classNamePrefix="custom-select"
                  onChange={(e) => {
                    setProject(e?.value);
                    setProjectLabel(e?.label);
                  }}
                  options={props?.project_type}
                  placeholder={projectLabel ? projectLabel : "Project Type"}
                />
              </div>

              <div className="text-center">
                <a
                  onClick={() => handleReset()}
                  className={`fs-6 explore-link justify-self-center mb-3 d-inline-flex align-items-center ${Style.filter_reset_btn}`}
                >
                  Reset Filters <span></span>
                </a>
                <button
                  onClick={handleClose}
                  className="btn btn-lg btn-primary rounded-pill w-100"
                >
                  Find the projects
                </button>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
      {projects ? (
        <>
          {width >= 992 ? (
            <div className="container">
              <div className={`row position-relative z-1 ${Style.row}`}>
                <div className="col-lg-6">
                  {projects?.map((el, i) => {
                    if (i % 2 != 1) {
                      return (
                        <div
                          key={i}
                          className={`pt-lg-3 position-relative text-center text-lg-start ${Style.home_project}`}
                        >
                          <ProjectListCard
                            link={el?.link}
                            innerContent={el?.specifications}
                            image={el?.image}
                            name={el?.title}
                            location={el?.place}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
                <div className={`col-lg-6 d-flex flex-column ${Style.col}`}>
                  {projects?.map((el, i) => {
                    if (i % 2 == 1) {
                      return (
                        <div
                          className={`pt-lg-3 position-relative text-center text-lg-start ${Style.home_project}`}
                          key={i}
                        >
                          <ProjectListCard
                            link={el?.link}
                            innerContent={el?.specifications}
                            image={el?.image}
                            name={el?.title}
                            location={el?.place}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              {totalCount != projects.length && (
                <div
                  className={`d-grid d-lg-block text-center mt-lg-auto ${Style.btn_wrap}`}
                >
                  <button
                    onClick={handleShowMore}
                    className="btn btn-primary btn-lg rounded-pill"
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="container">
              <div className={`row position-relative z-1 ${Style.row}`}>
                <div className="col-lg-6">
                  {projects?.map((el, i) => {
                    return (
                      <div
                        key={i}
                        className={`pt-lg-3 position-relative text-center text-lg-start ${Style.home_project}`}
                      >
                        <ProjectListCard
                          link={el?.link}
                          innerContent={el?.specifications}
                          image={el?.image}
                          name={el?.title}
                          location={el?.place}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {totalCount != projects.length && (
                <div
                  className={`d-grid d-lg-block text-center mt-lg-auto ${Style.btn_wrap}`}
                >
                  <button
                    onClick={handleShowMore}
                    className="btn btn-primary btn-lg rounded-pill"
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="container pb-5">
          <div className={Style.empty_wrapper}>
            <div className={Style.image_wrapper}>
              <Image
                alt=""
                width={222}
                height={169}
                src={Assets.no_data_gif}
              ></Image>
            </div>
            <h4 className={`${Style.heading}`}>No Data Found</h4>
            <p className={Style.para}>
              We’re sorry what you were looking for. Please try another way
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio1;
