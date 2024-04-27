import React, { useEffect, useState } from "react";
import Style from "./Carousel.module.css";
import { IoMdHeart } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { MdOutlineArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { bookmarkStory, getStoryById, likedStory } from "../../api/story";
import { useContext } from "react";
import { myContext } from "../../Context";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Carousel = ({ setOpencarousel, opencarousel, storyIds }) => {
  //calling bookmark data for checking if user has already bookmarked th data or not
  let { bookmarkData, setupBookmark } = useContext(myContext);
  /////---------------..
  const [ids] = useState(localStorage.getItem("userId"));
  const [carouseData, setCarouselData] = useState({});
  const [isliked, setIsliked] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  useEffect(() => {
    if (opencarousel) {
      const intervals = setInterval(next, 3500);
      return () => clearInterval(intervals);
    }
  }, [currentIndex]);

  useEffect(() => {
    setDatas();
  }, [isliked]);

  //if the user already liked it should show likes implement here
  useEffect(() => {
    const flg = carouseData?.story?.likes?.includes(ids);
    flg && setIsliked(true);
  }, [carouseData]);

  useEffect(() => {
    setupBookmark();
  }, [isBookmark, carouseData]);
  //check story is bookmarked or not
  useEffect(() => {
    checkBookmark();
  }, [carouseData]);

  const checkBookmark = () => {
    for (let i = 0; i < bookmarkData?.length; i++) {
      if (bookmarkData[i]?._id === carouseData?.story?._id) {
        // console.log(bookmarkData[i]._id,);
        setIsBookmark(true);
      }
    }
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouseData.story?.slides?.length - 1 : prev - 1
    );
  };
  const next = () => {
    setCurrentIndex((prev) =>
      prev === carouseData.story?.slides?.length - 1 ? 0 : prev + 1
    );
  };

  const setDatas = async () => {
    let res;
    if (storyIds) res = await getStoryById(storyIds);
    else return;
    setCarouselData(res);
    setLikesCount(res.likes);
  };

  const likeHandeler = async (userId, storyId) => {
    if (!ids) {
      toast.warn("Plz Login to Like", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      return;
    }
    await likedStory(userId, storyId);
    setIsliked(!isliked);
  };

  const bookmarkHandeler = async (story) => {
    if (!ids) {
      toast.warn("Plz Login to Bookmar", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      return;
    }
    await bookmarkStory(story);
    setIsBookmark(!isBookmark);
  };

  return (
    <div className={Style.maincontainer}>
      <div className={Style.container}>
        <div className={Style.carouselContainer}>
          {carouseData.story?.slides?.map((slide, index) => {
            return (
              <div
                key={index}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                className={Style.carousel}
              >
                <img src={slide.imageUrl} alt="" />
                <div className={Style.dataFooter}>
                  <h3>{slide.heading}</h3>
                  <p>{slide.description}</p>
                </div>
              </div>
            );
          })}
          <div className={Style.statusContainer}>
            {carouseData.story?.slides?.map((_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor:
                    currentIndex === index ? "white" : "#D9D9D980",
                }}
                className={Style.statusDiv}
              ></div>
            ))}
          </div>
          <div className={Style.heartFooter}>
            {/* bookmarks */}
            <div onClick={() => bookmarkHandeler(carouseData.story)}>
              <FaBookmark
                color={isBookmark ? "blue" : "white"}
                size="2.2rem"
                style={{ cursor: "pointer" }}
              />
            </div>
            {/* likes */}
            <div
              onClick={() =>
                likeHandeler(carouseData.story.userId, carouseData.story._id)
              }
            >
              <IoMdHeart
                color={isliked ? "red" : "white"}
                size="3rem"
                style={{ cursor: "pointer" }}
              />
              <span className={Style.counters}>{likesCount}</span>
            </div>
          </div>
          <span onClick={() => setOpencarousel(false)} className={Style.close}>
            X
          </span>
        </div>

        <div className={Style.btnDiv}>
          <MdOutlineArrowBackIosNew
            onClick={prev}
            style={{ cursor: "pointer" }}
          />
          <MdArrowForwardIos onClick={next} style={{ cursor: "pointer" }} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Carousel;
