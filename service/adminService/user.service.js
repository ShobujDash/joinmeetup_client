import axios from "@/lib/Axios/AxiosPublic";

export const getAllUsersAPI = async () => {
  const res = await axios.get("/api/admin/auth/getAllUsers");
  return res.data.users;
};

export const getAllAdminsAPI = async () => {
  const res = await axios.get("/api/admin/auth/getAllAdmins");
  return res.data.admins;
};
