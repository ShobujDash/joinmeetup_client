import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://joinmeetup-server-new.onrender.com",
  withCredentials: true,
});

export default axiosPublic;
