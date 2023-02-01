import { useEffect, useState } from "react";
import Select from "react-select";
import React, { useRef } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import Style from "./FilterBar.module.scss";
import { useWindowSize } from "../../helpers/windowDimensions";
import { useRouter } from "next/router";
import { AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";
const FilterBar = ({
  tabs,
  setCatName,
  catName,
  length,
  setSearchText,
  setChoice,
  options,
  setOptions,
  choice,
  searchText,
  type
}) => {
  const { width } = useWindowSize();
  const router = useRouter()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filterButtonVisible, setFilterButtonVisible] = useState(true);

  const selectInputRef = useRef();
  
  const handleReset = () => {
    selectInputRef?.current != null && selectInputRef.current.clearValue();
    setSearchText("");
  };
  useEffect(()=>{
    handleReset()
  },[catName])
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
  useEffect(() => {
    window.addEventListener("scroll", filterButtonVisibility);
    return () => window.removeEventListener("scroll", filterButtonVisibility);
  }, []);
  return (
    <>
      <div className="container">
        <div className={`row ${Style.filter}`}>
          <div className={`col-lg-4 ${Style.filter_nav}`}>
            <Nav className={`nav nav-tabs`}>
              {tabs?.map((value, index) => (
                <Nav.Item key={index}>
                  <Nav.Link
                    className={catName == value?.name && "active"}
                    onClick={() => {
                      setOptions(value?.categories);
                      setCatName(value?.name);
                    }}
                  >
                    {value?.name}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
          <div className={`col-lg-8 ${Style.filter_search} d-none d-lg-block`}>
            <div className="row">
              <div className={`${Style.search_sec}  ${searchText || choice ? "col-lg-3":"col-lg-4"} ms-lg-auto`}>
                <div className={Style.form_wrap}>
                  <span>
                    <AiOutlineSearch size={20} />
                  </span>
                  <input
                    className="form-control"
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search"
                    value={searchText}
                  />
                </div>
              </div>
              <div className={`${Style.select_sec} ${searchText || choice ? "col-lg-3":"col-lg-4"}`}>
                <Select
                  ref={selectInputRef}
                  instanceId="subsidiaries-select"
                  className="custom-select-wrap mb-4 mb-lg-0"
                  classNamePrefix="custom-select"
                  onChange={(e) => setChoice(e)}
                  options={options}
                  isClearable={true}
                  placeholder={choice?.label ? choice?.label :"Subsidiaries"}
                />
              </div>
                {searchText || choice ? (
              <div className={`${Style.reset_sec} col-lg-5`}>
                  <>
                    <span className={Style.result}>
                      Filter Results ({length})
                    </span>
                    <button onClick={() => handleReset()}>
                      Reset Filters <span></span>
                    </button>
                  </>
              </div>
               ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        className={
          filterButtonVisible
            ? `${Style.btn_filter} ${Style.btn_visible}`
            : `${Style.btn_filter}`
        }
        onClick={handleShow}
      >
        <AiOutlineFilter size={16} />
        Filter
      </button>

      <Offcanvas show={show} onHide={handleClose} className={Style.offcanvas}>
        <Offcanvas.Header
          closeButton
          className="justify-content-end"
        ></Offcanvas.Header>
        <Offcanvas.Body>
          <h3 className="head-sidebar">{type == "media" ? "Find media" : "Find news"}</h3>
          <Select
                  ref={selectInputRef}
                  instanceId="subsidiaries-select"
                  className="custom-select-wrap mb-4 mb-lg-0"
                  classNamePrefix="custom-select"
                  onChange={(e) => setChoice(e)}
                  options={options}
                  isClearable={true}
                  placeholder={choice?.label ? choice?.label :"Subsidiaries"}
                />
          <button onClick={handleClose} className="btn btn-lg btn-primary rounded-pill w-100">
            {type == "media" ? "Find media" : "Find news"}
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterBar;
