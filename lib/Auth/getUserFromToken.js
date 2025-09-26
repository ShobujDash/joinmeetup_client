import axiosPublic from "../Axios/AxiosPublic";

export const getUserFromToken = async () => {
  const res = await axiosPublic.get("/api/auth/me");

  return res?.data?.user;
};
