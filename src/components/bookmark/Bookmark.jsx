import React, { useContext, useEffect, useState } from "react";
import Style from "./Bookmarks.module.css";
import { myContext } from "../../Context";
import Carousel from "../carousel/Carousel";
const Bookmark = ({ onclose }) => {
  let { bookmarkData, setupBookmark } = useContext(myContext);
  const [opencarousel, setOpencarousel] = useState(false);
  const [storysId, setStorysid] = useState();
  useEffect(() => {
    setupBookmark();
  }, []);
  const storyCarousel = async (item) => {
    setStorysid(item);
    setOpencarousel(true);
  };
  return (
    <div className={Style.container}>
      <div className={Style.bookmarkDiv}>
        <button className={Style.closeBtn} onClick={() => onclose()}>
          X
        </button>
        {bookmarkData?.map((item, id) => {
          return (
            <div
              key={id}
              onClick={() => storyCarousel(item._id)}
              className={Style.storyCard}
            >
              <img src={item.slides[0].imageUrl} alt="" />
              <div className={Style.cardFooter}>
                <h2>{item.slides[0].heading}</h2>
                <p>{item.slides[0].description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {opencarousel && (
        <Carousel
          setOpencarousel={setOpencarousel}
          opencarousel={opencarousel}
          storyIds={storysId}
        />
      )}
    </div>
  );
};

export default Bookmark;
