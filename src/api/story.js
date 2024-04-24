import axios from "axios";

export const createStory = async (slides) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(
      "http://localhost:3000/api/v1/story/create",
      slides
    );
    // console.log(response);
  } catch (error) {
    console.log("error occured in story creation):", error);
  }
};

export const updateStory = async (storyId, slides) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(
      `http://localhost:3000/api/v1/story/update/${storyId}`,
      slides
    );
    return res.data;
  } catch (error) {
    console.log("error occured in story updation):", error);
  }
};

export const getStoryById = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/v1/story/getStoryById/${id}`
    );
    console.log("Like count-",res.likes);
    return res.data;
  } catch (error) {
    console.log("error occured in story getStoryById):", error);
  }
};

export const likedStory = async (userId, storyId) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(
      `http://localhost:3000/api/v1/story/likedStory/${storyId}/${userId}`
    );
    return res.data
    console.log(res);
  } catch (error) {
    console.log("error occured in story like):", error);
  }
};

export const getAllstory = async (filterArray, cat, page) => {
  try {
    let response = "";
    console.log(filterArray);
    if (filterArray.length === 0) {
      response = await axios.get(
        `http://localhost:3000/api/v1/story/getAllstory?cat=${cat}&page=${page}`
      );
    } else {
      response = await axios.get(
        `http://localhost:3000/api/v1/story/getAllstory?categories=${filterArray}`
      );
    }
    console.log(response.data.storyData);
    return response.data.storyData;
  } catch (error) {
    console.log("error occured in story get):", error);
  }
};
