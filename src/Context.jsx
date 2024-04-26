import { createContext, useState } from "react";
import { getbookmarks } from "./api/story";

export const myContext = createContext();

export const ContexProvider = ({ children }) => {
  let [editData, setEditData] = useState([]);
  let [isEdit, setIsEdit] = useState(false);
  let [storyid, setStoryid] = useState();

  //setting up the bookmarks data

  let [bookmarkData, setBookmarkData] = useState([]);

  const setupBookmark = async () => {
    const res = await getbookmarks();
    setBookmarkData(res);
  };

  return (
    <>
      <myContext.Provider
        value={{
          editData,
          setEditData,
          isEdit,
          setIsEdit,
          storyid,
          setStoryid,
          bookmarkData,
          setupBookmark,
        }}
      >
        {children}
      </myContext.Provider>
    </>
  );
};
