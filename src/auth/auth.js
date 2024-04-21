import axios from "axios";

export const registerUser = async ({ name, userPassword }) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/register",
      {
        name,
        password: userPassword,
      }
    );
    console.log(response.data);
  } catch (error) {
    return error;
  }
};

export const loginUser = async ({ name, userPassword }) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/login",
      {
        name,
        password: userPassword,
      }
    );
    console.log(response.data);
     localStorage.setItem("token", response.data.token);
     return response.data.name
  } catch (error) {
    return error.response.status;
  }
};
