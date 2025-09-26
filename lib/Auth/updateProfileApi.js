import axiosPublic from "../Axios/AxiosPublic";

export const updateProfile = async (formData) => {
  const res = await axiosPublic.put("/api/auth/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
