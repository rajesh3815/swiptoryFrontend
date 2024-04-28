import React from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Carousel from "./components/carousel/Carousel";

const App = () => {
  return (
    <div>
      {/* <Home /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/story"
            element={
              <Carousel
                storyIds={"6624c3dffa7077f1bce9df6e"}
                opencarousel={true}
                setOpencarousel={""}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
