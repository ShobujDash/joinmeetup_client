import axios from "@/lib/Axios/AxiosPublic";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default axiosPublic;
