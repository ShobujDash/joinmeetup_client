import axiosPublic from "@/lib/Axios/AxiosPublic";

export const createRegisterEventAPI = async (payload) => {
  const { data } = await axiosPublic.post(`/api/registerEvent/create`, payload);
  return data;
};

export const checkIfUserRegisteredEventAPI = async (eventId) => {
  const { data } = await axiosPublic.get(
    `/api/registerEvent/isRegisteredEvent/${eventId}`
  );
  return data;
};

export const getMyRegisteredEventAPI = async () => {
  const { data } = await axiosPublic.get(
    `/api/registerEvent/myRegisteredEvents`
  );
  return data;
};
export const participantsAPI = async () => {
  const { data } = await axiosPublic.get(`/api/registerEvent/participants`);
  return data;
};
export const getParticipantsByEventIdAPI = async (eventId) => {
  const { data } = await axiosPublic.get(
    `/api/registerEvent/participantsByEventId/${eventId}`
  );
  return data?.data;
};

export const getAllRegistrationAPI = async () => {
  const res = await axiosPublic.get("/api/registerEvent/all");
  return res?.data?.data;
};

export const getDetailsByTransIdAPI = async (trans_id) => {
  const res = await axiosPublic.get(
    `/api/registerEvent/trans_details/${trans_id}`
  );
  return res?.data?.data;
};

