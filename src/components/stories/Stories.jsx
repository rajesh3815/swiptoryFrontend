import React, { useContext, useEffect, useState } from "react";
import Styles from "./Stories.module.css";
import { getAllstory, getStoryById } from "../../api/story";
import { categories } from "../../util/constant";
import { myContext } from "../../Context";
import { FaRegEdit } from "react-icons/fa";
import Carousel from "../carousel/Carousel";
const Stories = ({ filterArray }) => {
  const [ids] = useState(localStorage.getItem("userId"));
  const [stories, setStories] = useState({});
  const [opencarousel, setOpencarousel] = useState(false);
  const [storysId, setStorysid] = useState(); //for seeting the story id and send to casouel
  let { editData, setEditData, setIsEdit, isEdit, setStoryid } =
    useContext(myContext);
  useEffect(() => {
    storyFetch();
    console.log(stories);
  }, []);
  const storyFetch = async () => {
    const res = await getAllstory([], "all", 1);
    setStories(res);
  };

  const clickHandeler = (datas, ids, e) => {
    e.stopPropagation();
    console.log(e);
    // setOpencarousel(false);
    setStoryid(ids);
    setEditData(datas);
    setIsEdit(true);
    console.log("====================================");
    // console.log(editData);
    console.log("====================================");
  };

  const storyCarousel = async (item) => {
    setStorysid(item);
    setOpencarousel(true);
  };
  return (
    <>
      {filterArray.length === 0 ? (
        <div className={Styles.allStorydiv}>
          {categories.map((category, index) => {
            return (
              <div key={index} className={Styles.conatainer}>
                <h3>Top stories about {category}</h3>
                <div className={Styles.storySections}>
                  {stories?.[category] && stories?.[category].length === 0 ? (
                    <div className={Styles.emptydiv}>
                      <p>No stories Available</p>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                  {stories?.[category]?.map((item, id) => {
                    return (
                      <div
                        onClick={() => storyCarousel(item._id)}
                        className={Styles.storyCard}
                      >
                        <img src={item.slides[0].imageUrl} alt="" />
                        <div className={Styles.cardFooter}>
                          <h2>{item.slides[0].heading}</h2>
                          <p>{item.slides[0].description}</p>
                        </div>
                        {item.userId === ids ? (
                          <button
                            onClick={(e) =>
                              clickHandeler(item.slides, item._id, e)
                            }
                          >
                            <span>
                              <FaRegEdit style={{ fontSize: "1.7rem" }} /> Edit
                            </span>
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
                {stories?.[category] && stories?.[category].length > 5
                  ? ""
                  : ""}
                <button className={Styles.showbtn}>Show more</button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {filterArray.map((category, index) => {
            return (
              <div className={Styles.conatainer}>
                <h3>Top stories about {category}</h3>
                <div className={Styles.storySections}>
                  {stories?.[category].length === 0 ? (
                    <div className={Styles.emptydiv}>No stories Available</div>
                  ) : (
                    ""
                  )}
                  {stories?.[category]?.map((item, id) => {
                    return (
                      <div className={Styles.storyCard}>
                        <h2>{item.slides[0].heading}</h2>
                        <img src={item.slides[0].imageUrl} alt="" />
                        <p>{item.slides[0].description}</p>
                        {item.userId === ids ? (
                          <button
                            onClick={() => clickHandeler(item.slides, item._id)}
                          >
                            Edit
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {opencarousel && (
        <Carousel
          setOpencarousel={setOpencarousel}
          opencarousel={opencarousel}
          storyIds={storysId}
        />
      )}
    </>
  );
};

export default Stories;
