
import axiosPublic from "@/lib/Axios/AxiosPublic";

export const createFormBuilderAPI = async ({ eventId, ticketId, formData }) => {
  const res = await axiosPublic.post("/api/formbuilder/create", {
    eventId,
    ticketId,
    formData,
  });

  return res.data;
};

export const getFormBuilderAPI = async ({ eventId, ticketId }) => {
  const {data} = await axiosPublic.get(`/api/formbuilder/${eventId}/${ticketId}`);
  return data;
};

export const updateFormBuilderAPI = async ({ eventId, ticketId, formData }) => {
  const {data} = await axiosPublic.put(`/api/formbuilder/${eventId}/${ticketId}`, {
    formData,
  });
  return data;
};