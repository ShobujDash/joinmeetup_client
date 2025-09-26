import axios from "@/lib/Axios/AxiosPublic";

export const registerUser = async (formData) => {
  const res = await axios.post("/api/admin/auth/register", formData);
  return res.data;
};

export const loginUser = async (formData) => {
  const res = await axios.post("/api/admin/auth/login", formData);
  return res.data;
};

export const getAdminFromToken = async () => {
  const res = await axios.get("/api/admin/auth/me");
  return res?.data?.admin;
};

export const logoutAdmin = async () => {
  await axios.post("/api/admin/auth/logout");
};
