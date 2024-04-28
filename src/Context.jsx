import { createContext, useState } from "react";
import { getbookmarks } from "./api/story";

export const myContext = createContext();

export const ContexProvider = ({ children }) => {
  let [editData, setEditData] = useState([]);
  let [isEdit, setIsEdit] = useState(false);
  let [storyid, setStoryid] = useState();
  let [storyCreated, setStoryCreated] = useState();

  //setting up the bookmarks data

  let [bookmarkData, setBookmarkData] = useState([]);
  let [loginStatus, setLoginstatus] = useState(false);
  const setupBookmark = async () => {
    if (!localStorage.getItem("token")) return;
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
          loginStatus,
          setLoginstatus,
          storyCreated,
          setStoryCreated,
        }}
      >
        {children}
      </myContext.Provider>
    </>
  );
};
