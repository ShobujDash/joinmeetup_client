import axiosPublic from "@/lib/Axios/AxiosPublic";


export const getAllTicketsAPI = async () => {
  const res = await axiosPublic.get("/api/admin/ticket/all");
  return res.data.tickets;
};

export const getMyTicketsAPI = async () => {
  const res = await axiosPublic.get("/api/admin/ticket/all");
  return res.data.tickets;
};

