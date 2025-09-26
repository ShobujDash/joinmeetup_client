import axiosPublic from "../Axios/AxiosPublic";

export const getTicketByEventIdService = async (eventId) => {
  try {
    const {data} = await axiosPublic.get(`/api/ticket/${eventId}`);
    if (!data?.success) {
      return [];
    }
    return data?.ticket;
  } catch (error) {
    console.error("Error getting user from token:", error);
    return [];
  }
};


