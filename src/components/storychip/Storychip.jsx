import React, { useEffect, useState } from "react";
import { categories } from "../../util/constant";
import Styles from "./Storychip.module.css";
import all from "../../assets/all.png";
import food from "../../assets/Food.png";
import fitness from "../../assets/fitness.jpg";
import fashion from "../../assets/fashion.jpeg";
import world from "../../assets/world.png";
import medical from "../../assets/medical.png";
import { getAllstory } from "../../api/story";

const Storychip = ({ filterArray, setFilterArray }) => {
  const clickHandeler = (item = null) => {
    if (!item) {
      setFilterArray([]);
      return;
    }
    if (!filterArray.includes(item)) {
      setFilterArray((prev) => [...prev, item]);
    } else {
      setFilterArray((prev) => prev.filter((chip) => chip !== item));
    }
    console.log(filterArray);
  };

  return (
    <div className={Styles.chipsContainer}>
      <div className={Styles.chipsinner}>
        <div
          onClick={() => clickHandeler(null)}
          style={{
            border: filterArray.length === 0 ? "4px solid blue" : "",
          }}
          className={Styles.chipall}
        >
          <img src={all} alt="" />
          <p style={{ zIndex: "100", position: "absolute" }}>All</p>
          <div className={Styles.glass}></div>
        </div>
        <div
          onClick={() => clickHandeler("fitness")}
          style={{
            border: filterArray.includes("fitness") ? "4px solid blue" : "",
          }}
          className={Styles.chipall}
        >
          <img src={fitness} alt="" />
          <p style={{ zIndex: "100", position: "absolute" }}>Fitness</p>
          <div className={Styles.glass}></div>
        </div>
        <div
          onClick={() => clickHandeler("fashion")}
          style={{
            border: filterArray.includes("fashion") ? "4px solid blue" : "",
          }}
          className={Styles.chipall}
        >
          <img src={fashion} alt="" />
          <p style={{ zIndex: "100", position: "absolute" }}>fashion</p>
          <div className={Styles.glass}></div>
        </div>
        <div
          onClick={() => clickHandeler("medical")}
          style={{
            border: filterArray.includes("medical") ? "4px solid blue" : "",
          }}
          className={Styles.chipall}
        >
          <img src={medical} alt="" />
          <p style={{ zIndex: "100", position: "absolute" }}>medical</p>
          <div className={Styles.glass}></div>
        </div>
        <div
          onClick={() => clickHandeler("Food")}
          style={{
            border: filterArray.includes("Food") ? "4px solid blue" : "",
          }}
          className={Styles.chipall}
        >
          <img src={food} alt="" />
          <p style={{ zIndex: "100", position: "absolute" }}>Food</p>
          <div className={Styles.glass}></div>
        </div>
        <div
          onClick={() => clickHandeler("World")}
          style={{
            border: filterArray.includes("World") ? "4px solid blue" : "",
          }}
          className={Styles.chipall}
        >
          <img src={world} alt="" />
          <p style={{ zIndex: "100", position: "absolute" }}>World</p>
          <div className={Styles.glass}></div>
        </div>
      </div>
    </div>
  );
};

export default Storychip;
