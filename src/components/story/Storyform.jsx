import React, { useEffect, useRef, useState } from "react";
import Form from "../form/form";
import Style from "./Storyform.module.css";
import { categories} from "../../util/constant"
import { createStory } from "../../api/story";

const Storyform = ({ onclose }) => {
  const storyref = useRef();
  const [constCategory, setConstcategory] = useState(categories);
  const initialSlide = {
    heading: "",
    description: "",
    imageUrl: "",
    category: "",
  };
  const [slides, setSlides] = useState([
    initialSlide,
    initialSlide,
    initialSlide,
  ]);
  const[a,seta]=useState([{},{}])
  const [errors, setErrors] = useState("");
  const [currentSlide, setcurrentSlide] = useState(0);
  
  const handelchange = (e, curIndex) => {
    const { name, value } = e.target;
    if (name === "category") {
      setConstcategory((prev) => prev.filter((item, index) => item === value));
    }
    setSlides((prevSlide) =>
      prevSlide.map((slide, index) =>
        index === curIndex ? { ...slide, [name]: value } : slide
      )
    );
  };
  const addnewslideHandeler = () => {
    if (slides.length < 6) {
      setSlides((prev) => [...prev, {}]);
      setcurrentSlide(slides.length);
    }
  };
  //slide deletion goes on here
  const deleteslideHandeler = (index) => {
    if (slides.length > 3) {
      setSlides((prevslide) => prevslide.filter((_, i) => i !== index));
      setprevSlide();
    }
  };
  const setprevSlide = () => {
    setcurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0);
  };
  const setnextSlide = () => {
    setcurrentSlide(
      currentSlide < slides.length - 1 ? currentSlide + 1 : slides.length - 1
    );
  };
  const submitHandeler = () => {
    // handeling empty fields
    for (let i = 0; i < slides.length; i++) {
      if (
        slides[i].imageUrl.trim() === "" ||
        slides[i].heading.trim() === "" ||
        slides[i].description.trim() === "" ||
        slides[i].category.trim() === ""
      ) {
        setErrors("All fields are required");
        return;
      }
    }
    createStory(slides)
  };
  const closeModal = (e) => {
    if (storyref.current === e.target) {
      onclose();
    }
  };
  return (
    <div onClick={closeModal} ref={storyref} className={Style.mainContainer}>
      <div className={Style.container}>
        <button onClick={() => onclose()} className={Style.closeModal}>
          X
        </button>
        {/* design slider buttons */}
        <div className={Style.sliderContainer} style={{ display: "flex" }}>
          {slides.map((s, i) => (
            <React.Fragment key={i}>
              <div className={Style.sliderChip}>
                <div
                  key={i}
                  style={{
                    border: i === currentSlide ? "2px solid black" : "",
                  }}
                  onClick={() => setcurrentSlide(i)}
                >
                  slide {i}
                </div>
                {slides.length > 3 && (
                  <button onClick={() => deleteslideHandeler(i)}>x</button>
                )}
              </div>
            </React.Fragment>
          ))}
          <button className={Style.btnadd} onClick={addnewslideHandeler}>
            Add+
          </button>
        </div>

        {slides.map((slide, slideIndex) => (
          <React.Fragment key={slideIndex}>
            {slideIndex === currentSlide && (
              <Form
                key={slideIndex}
                slide={slide}
                handelchange={(e) => handelchange(e, slideIndex)}
                slideIndex={slideIndex}
                constCategory={constCategory}
              />
            )}
          </React.Fragment>
        ))}
        {/* error message */}
        <p style={{ textAlign: "center", color: "red" ,marginTop:"10px"}}>{errors}</p>
        <div className={Style.btns}>
          <div>
            <button
              style={{ background: "#7EFF73", marginRight: "5px" }}
              className={Style.submitBtn}
              onClick={setprevSlide}
            >
              Previous
            </button>
            <button
              style={{ background: "#73ABFF" }}
              className={Style.submitBtn}
              onClick={setnextSlide}
            >
              Next
            </button>
          </div>
          <button className={Style.submitBtn} onClick={submitHandeler}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Storyform;
