import { createContext, useState } from "react";

export const myContext = createContext();

export const ContexProvider = ({ children }) => {
  let [editData, setEditData] = useState([]);
  let [isEdit, setIsEdit] = useState(false);
  let [storyid, setStoryid] = useState();
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
        }}
      >
        {children}
      </myContext.Provider>
    </>
  );
};
