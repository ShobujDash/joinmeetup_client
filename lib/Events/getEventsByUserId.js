import axiosPublic from "../Axios/AxiosPublic";

export const getEventsByUserIdService = async () => {
  try {
    const res = await axiosPublic.get("/api/events/userId");
    return res?.data?.event;
  } catch (error) {
    console.error("Error getting user from token:", error);
    return [];
  }
};

export const getEventsByCreatorIdService = async (creatorId) => {
  try {
    const res = await axiosPublic.get(`/api/events/${creatorId}`);
    return res?.data?.events;
  } catch (error) {
    console.error("Error getting user from token:", error);
    return [];
  }
};
