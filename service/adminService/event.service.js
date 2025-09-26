import axios from "@/lib/Axios/AxiosPublic";

export const getAllEventsAPI = async () => {
  const res = await axios.get("/api/events/all");
  return res.data.events;
};
export const getCreatorEventsAPI = async () => {
  const res = await axios.get("/api/events/userId");
  return res.data.events;
};
