// lib/Booking/bookingService.js
import axiosPublic from "../Axios/AxiosPublic";

export const createBooking = async (eventId) => {
  const res = await axiosPublic.post("/api/booking", { eventId });
  return res.data.booking;
};

export const getMyBookings = async () => {
  const res = await axiosPublic.get("/api/booking/my");
  return res.data.bookings;
};