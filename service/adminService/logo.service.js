import axios from "@/lib/Axios/AxiosPublic";

export const getAllLogoAPI = async () => {
  const res = await axios.get("/api/admin/logo/all");
  return res?.data?.data;
};

export const postLogoAPI = async (formData) => {
  const res = await axios.post("/api/admin/logo/create", formData);
  return res?.data;
};
