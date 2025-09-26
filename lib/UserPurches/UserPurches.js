import axiosPublic from "../Axios/AxiosPublic";

export const postUserPurcheshDetails = async (value) => {
  try {
    const { data } = await axiosPublic.post(`/api/purches`,value);
    if (!data?.success) {
      return [];
    }
    return data;
  } catch (error) {
    console.error("Error getting user from token:", error);
    return [];
  }
};
