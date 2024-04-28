import React, { useContext, useEffect, useState } from "react";
import Styles from "./Stories.module.css";
import { getAllstory, getStoryById } from "../../api/story";
import { categories } from "../../util/constant";
import { myContext } from "../../Context";
import { FaRegEdit } from "react-icons/fa";
import Carousel from "../carousel/Carousel";
const Stories = ({ filterArray }) => {
  const [ids, setIds] = useState(localStorage.getItem("userId"));
  const [stories, setStories] = useState({}); //all storys save here
  const [opencarousel, setOpencarousel] = useState(false);
  const [storysId, setStorysid] = useState(); //for seeting the story id and send to casouel
  const [myStorylength, setMyStorylength] = useState(4);
  //setup total length of the each story
  const [storyLen, setStoryLen] = useState({});
  const [lengths, setLengths] = useState({
    Food: 2,
    fitness: 2,
    fashion: 2,
    World: 2,
    medical: 2,
  }); //initial lengths
  let { editData, setEditData, setIsEdit, isEdit, setStoryid, loginStatus } =
    useContext(myContext);
  useEffect(() => {
    storyFetch();
    console.log(stories);
    console.log(loginStatus);
    setIds(localStorage.getItem("userId"));
  }, [isEdit, setIsEdit, loginStatus, ids]);
  const storyFetch = async () => {
    const res = await getAllstory([], "all", 1);
    setStories(res.storyData);
    setStoryLen(res.storyLength);
  };

  const clickHandeler = (datas, ids, e) => {
    e.stopPropagation();
    setStoryid(ids);
    setEditData(datas);
    setIsEdit(true);
  };

  const storyCarousel = async (item) => {
    setStorysid(item);
    setOpencarousel(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const shomoreHandeler = async (category) => {
    let res = await getAllstory([], category, lengths[category]);
    let l = lengths[category];
    setLengths((prev) => ({ ...prev, [category]: l + 1 }));
    setStories((prev) => ({ ...prev, [category]: res.storyData }));
  };
  const myStoryHandeler = () => {
    if (myStorylength > stories?.["myStory"]?.length){
      setMyStorylength(4)
      return;
    } 
    setMyStorylength((prev) => prev + 4);
  };
  return (
    <>
      {filterArray.length === 0 ? (
        <div className={Styles.allStorydiv}>
          {stories?.["myStory"]?.length !== 0 && (
            <div className={Styles.conatainer}>
              <h3>Your Stories</h3>
              <div className={Styles.myStory}>
                {stories?.["myStory"]
                  ?.slice(0, myStorylength)
                  ?.map((item, index) => {
                    return (
                      <div
                        key={index}
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
              {myStorylength < stories?.["myStory"]?.length ? (
                <button onClick={myStoryHandeler} className={Styles.showbtn}>
                  Shomore
                </button>
              ) : (
                ""
              )}
            </div>
          )}
          {categories.map((category, index) => {
            return (
              <div key={index} className={Styles.conatainer}>
                <h3>Top stories about {category}</h3>
                <div key={Date.now()} className={Styles.storySections}>
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
                        key={id}
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
                {storyLen?.[category] > 4 &&
                stories?.[category].length < storyLen[category] ? (
                  <button
                    onClick={() => shomoreHandeler(category)}
                    className={Styles.showbtn}
                  >
                    Show more
                  </button>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={Styles.allStorydiv}>
          {filterArray.map((category, index) => {
            return (
              <div key={index} className={Styles.conatainer}>
                <h3>Top stories about {category}</h3>
                <div key={Date.now()} className={Styles.storySections}>
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
                        key={id}
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
                {storyLen?.[category] > 4 &&
                stories?.[category].length < storyLen[category] ? (
                  <button
                    onClick={() => shomoreHandeler(category)}
                    className={Styles.showbtn}
                  >
                    Show more
                  </button>
                ) : (
                  ""
                )}
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
