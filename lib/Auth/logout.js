import axiosPublic from "../Axios/AxiosPublic";

export const logoutUser = async () => {
  await axiosPublic.post("/api/auth/logout");
};
