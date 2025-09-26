import axiosPublic from "@/lib/Axios/AxiosPublic";

export const sslPaymentRegisterEventAPI = async (payload) => {
  const { data } = await axiosPublic.post(
    `/api/payment/checkout`,
    payload
  );
  return data;
};

export const sslIPNAPI = async (transId) => {
  const { data } = await axiosPublic.post(`/api/payment/checkout/ipn`, {
    tran_id: transId,
  });
  return data;
};

