import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL_USER;

export const getReview = async () => {
  try {
    const response = await axios.get(`${API_URL}/getallreviews`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
};