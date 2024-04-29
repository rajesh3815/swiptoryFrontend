import React from "react";
import Style from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={Style.container}>
      <div >
      <span className={Style.loader}></span>
      </div>
    </div>
  );
};

export default Loader;
