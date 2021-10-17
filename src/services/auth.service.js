import axios from "axios";

const API_URL = "http://localhost:4001/";

const register = (role, password) => {
  return axios.post(API_URL + "register", {
    role,
    password,
  });
};

const login = (role, password) => {
  return axios
    .post(API_URL + "login", {
      role,
      password,
    })
    .then((response) => {
      console.log('login', response);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
