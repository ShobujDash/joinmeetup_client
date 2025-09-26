import axiosPublic from "../Axios/AxiosPublic";

export const loginUser = async (userData) => {
  const res = await axiosPublic.post("/api/auth/login", userData);

  return res.data.data;
};
