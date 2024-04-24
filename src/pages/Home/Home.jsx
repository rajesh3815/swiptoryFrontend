import React, { useState } from "react";
import Styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Storychip from "../../components/storychip/Storychip";
import Stories from "../../components/stories/Stories";
import { ContexProvider } from "../../Context";
const Home = () => {
  const [filterArray, setFilterArray] = useState([]);
  return (
    <div>
     <ContexProvider>
      <Navbar />
      <Storychip
        filterArray={filterArray}
        setFilterArray={setFilterArray}
      />
      <Stories filterArray={filterArray} />
      </ContexProvider>
    </div>
  );
};

export default Home;
