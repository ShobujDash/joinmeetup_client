
import axiosPublic from "../Axios/AxiosPublic";

export const fetchEvents = async (number) => {
  try {
    const url = number ? `/api/events/all?number=${number}` : `/api/events/all`;

    const res = await axiosPublic.get(url, {
      headers: {
        "Cache-Control": "max-age=86400",
      },
    });

    return res.data?.events || [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
};


export const fetchEventsByCategory = async (categoryName) => {
  try {
    // Space বা special character handle করার জন্য encodeURIComponent ব্যবহার করো
    const encodedCategory = encodeURIComponent(categoryName);

    const res = await axiosPublic.get(
      `/api/events/category/${encodedCategory}`
    );

    return res.data?.events || [];
  } catch (error) {
    console.error("Failed to fetch events by category:", error);
    return [];
  }
};

