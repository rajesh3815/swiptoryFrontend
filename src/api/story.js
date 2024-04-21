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

export const getAllstory = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/story/getAllstory"
    );
    return response.data;
  } catch (error) {
    console.log("error occured in story get):", error);
  }
};
