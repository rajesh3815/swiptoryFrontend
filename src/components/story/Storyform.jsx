import React, { useContext, useEffect, useRef, useState } from "react";
import Form from "../form/form";
import Style from "./Storyform.module.css";
import { categories } from "../../util/constant";
import { createStory, updateStory } from "../../api/story";
import { myContext } from "../../Context";
import { ToastContainer, toast, Bounce,Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Storyform = ({ onclose }) => {
  let { editData, setEditData, setIsEdit, isEdit, storyid, setStoryid ,storyCreated, setStoryCreated} =
    useContext(myContext);
  const storyref = useRef();
  const [constCategory, setConstcategory] = useState(categories);
  const initialSlide = {
    heading: "",
    description: "",
    imageUrl: "",
    category: "",
  };

  const [ds, setds] = useState([
    { heading: "d", description: "df", imageUrl: "df", category: "df" },
    { heading: "dsfg", description: "dsf", imageUrl: "sg", category: "sdg" },
    { heading: "sdg", description: "sdg", imageUrl: "sdg", category: "sdg" },
  ]);
  const [slides, setSlides] = useState([
    initialSlide,
    initialSlide,
    initialSlide,
  ]);
  useEffect(() => {
    if (editData.length > 0) {
      setSlides(editData);
    } else {
      console.log("====================================");
      console.log("dsfdsjkfdfj");
      console.log("====================================");
      setSlides([initialSlide, initialSlide, initialSlide]);
    }
  }, [editData]);
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
    if (isEdit) {
      updateStory(storyid, slides);
      setEditData([]);
      setStoryid("");
      toast.success("Edited successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      createStory(slides);
      toast.success("Created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      setStoryCreated(!storyCreated)
    }
  };
  const closeModal = () => {
    // if (storyref.current === e.target) {
    //   onclose();
    // }
    onclose();
    setIsEdit(false);
  };
  return (
    <div ref={storyref} className={Style.mainContainer}>
      <div className={Style.container}>
        <button onClick={() => closeModal()} className={Style.closeModal}>
          X
        </button>
        <p className={Style.mediaP}>Add story to feed</p>
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
                  <p>slide</p>
                  <p> {i}</p>
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
        <p className={Style.errMessage}>{errors}</p>
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
            {isEdit ? "edit" : "Post"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Storyform;
