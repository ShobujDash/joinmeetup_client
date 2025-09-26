import axiosPublic from "../Axios/AxiosPublic";

export const register = async (userData) => {

  console.log("first",userData)

  const res = await axiosPublic.post("/api/auth/register", userData);

  return res.data.data;
};
