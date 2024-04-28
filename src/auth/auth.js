import axios from "axios";

export const registerUser = async ({ name, userPassword }) => {
  try {
    const response = await axios.post(
      "https://swiptoryserver-erk2.onrender.com/api/v1/user/register",
      {
        name,
        password: userPassword,
      }
    );
    console.log(response);
    return response.data.status
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async ({ name, userPassword }) => {
  try {
    const response = await axios.post(
      "https://swiptoryserver-erk2.onrender.com/api/v1/user/login",
      {
        name,
        password: userPassword,
      }
    );
    console.log("data from login-", response.data);
    localStorage.setItem("userId", response.data.userId);
    localStorage.setItem("token", response.data.token);
    return response.data.name;
  } catch (error) {
    return error.response.status;
  }
};
