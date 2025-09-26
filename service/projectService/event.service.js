
import axiosPublic from "@/lib/Axios/AxiosPublic";

export const getSingleEventAPI = async (eventId) => {
  const { data } = await axiosPublic(`/api/events/single-event/${eventId}`);
  if (!data?.success) throw new Error("Failed to fetch event");
  return data?.event;
};


