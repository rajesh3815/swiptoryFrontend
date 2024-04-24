import React, { useEffect, useState } from "react";
import Style from "./Carousel.module.css";
import { IoMdHeart } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { MdOutlineArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { getStoryById, likedStory } from "../../api/story";
const Carousel = ({ setOpencarousel, opencarousel, storyIds }) => {
  const [ids] = useState(localStorage.getItem("userId"));
  const [carouseData, setCarouselData] = useState({});
  const [isliked, setIsliked] = useState(false);
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
    console.log(carouseData);
  }, [currentIndex, isliked]);
  //if the user already liked it should show likes implement here
  useEffect(() => {
    const flg = carouseData?.story?.likes?.includes(ids);
    console.log(carouseData);
    console.log(flg);
    flg && setIsliked(true);
  }, [carouseData]);

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouseData.story?.slides?.length - 1 : prev - 1
    );
    console.log(currentIndex);
  };
  const next = () => {
    setCurrentIndex((prev) =>
      prev === carouseData.story?.slides?.length - 1 ? 0 : prev + 1
    );
  };

  const setDatas = async () => {
    const res = await getStoryById(storyIds);
    setCarouselData(res);
    setLikesCount(res.likes);
  };
  const likeHandeler = async (userId, storyId) => {
    await likedStory(userId, storyId);
    setIsliked(!isliked);
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
            <div>
              <FaBookmark
                color="white"
                size="2.2rem"
                style={{ cursor: "pointer" }}
              />
            </div>
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
              <span>{likesCount}</span>
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
    </div>
  );
};

export default Carousel;
