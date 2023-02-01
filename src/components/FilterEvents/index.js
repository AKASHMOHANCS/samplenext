import React from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./filterEvents.module.scss";

const FilterEvents = ({}) => {
  const [selectDate, setSelectDate] = useState("All");
  const [selectSpeaker, setSelectSpeaker] = useState("All");
  const [selectProduct, setSelectProduct] = useState("All");

  let tempData = {
    date: selectDate,
    speaker: selectSpeaker,
    product: selectProduct,
  };

  const handleDateFilter = (value) => {
    setSelectDate(value);
  };
  const handleSpeakerFilter = (value) => {
    setSelectSpeaker(value);
  };
  const handleProductFilter = (value) => {
    setSelectProduct(value);
  };

  const handleDateData = (data) => {
    if (tempData.date !== "All") {
      return data.date === tempData.date;
    } else {
      return data;
    }
  };

  const handleSpeakerData = (data) => {
    if (tempData.speaker !== "All") {
      return data.speaker === tempData.speaker;
    } else {
      return data;
    }
  };
  const handleProductData = (data) => {
    if (tempData.product !== "All") {
      return data.product === tempData.product;
    } else {
      return data;
    }
  };

  const getData = () => {
    let array = upcomingEvent.filter(
      (data) =>
        handleDateData(data) &&
        handleSpeakerData(data) &&
        handleProductData(data)
    );
    return array;
  };

  const getDateData = () => {
    let array = upcomingEvent?.filter((data) => data);
    let uniqueDate = Array.from(new Set(array.map((item) => item.date)));

    return uniqueDate;
  };

  const getSpeakerData = () => {
    let array = upcomingEvent?.filter((data) => data);
    let uniqueSpeaker = Array.from(new Set(array.map((item) => item.speaker)));
    return uniqueSpeaker;
  };

  const getProductData = () => {
    let array = upcomingEvent?.filter((data) => data);
    let uniqueProduct = Array.from(new Set(array.map((item) => item.product)));
    return uniqueProduct;
  };

  const handleClearFilter = () => {
    // setFilterData(temp);
    setSelectDate("All");
    setSelectSpeaker("All");
    setSelectProduct("All");

    var dropDown1 = document.getElementById("selectOptionDate");
    dropDown1.selectedIndex = 0;
    var dropDown2 = document.getElementById("selectOptionSpeaker");
    dropDown2.selectedIndex = 0;
    var dropDown3 = document.getElementById("selectOptionProduct");
    dropDown3.selectedIndex = 0;
  };

  return (
    <Row className="mt-4">
      <Col lg="auto" className={Style.selectContainer}>
        <select
          className={Style.selectText}
          onChange={(e) => {
            handleDateFilter(e.target.value);
          }}
          id="selectOptionDate"
        >
          <option hidden value={0}>
            Select Date
          </option>

          {selectDate !== "All" ? <option value="All">All</option> : null}

          {getDateData()?.map((items, i) => {
            return (
              <option value={items} key={i}>
                {items}
              </option>
            );
          })}
        </select>
      </Col>

      <Col lg="auto" className={Style.selectContainer}>
        <select
          className={Style.selectText}
          onChange={(e) => {
            handleSpeakerFilter(e.target.value);
          }}
          id="selectOptionSpeaker"
        >
          <option hidden value={0}>
            Select Speaker
          </option>

          {selectSpeaker !== "All" ? <option value="All">All</option> : null}

          {getSpeakerData()?.map((items, i) => {
            return (
              <option value={items} key={i}>
                {items}
              </option>
            );
          })}
        </select>
      </Col>
      <Col lg="auto" className={Style.selectContainer}>
        <select
          className={Style.selectText}
          onChange={(e) => {
            handleProductFilter(e.target.value);
          }}
          id="selectOptionProduct"
        >
          <option hidden value={0}>
            Choose Product
          </option>
          {selectProduct !== "All" ? <option value="All">All</option> : null}
          {getProductData()?.map((items, i) => {
            return (
              <option value={items} key={i}>
                {items}
              </option>
            );
          })}
        </select>
      </Col>
      <Col lg="auto">
        <button
          className={Style.button}
          onClick={() => {
            handleClearFilter();
          }}
        >
          Clear Filter
        </button>
      </Col>
    </Row>
  );
};

export default FilterEvents;
