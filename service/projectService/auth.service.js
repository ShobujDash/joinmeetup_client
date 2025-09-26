import axiosPublic from "@/lib/Axios/AxiosPublic";

export const createUserAPI = async (users) => {
  const { data } = await axiosPublic.post(`/api/auth/createUsers`, {
    users,
  });
  return data;
};

export const verifyUserAPI = async (formData) => {
  const { data } = await axiosPublic.post(`/api/auth/verify-otp`, formData);
  return data;
};
