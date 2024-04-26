import axios from 'axios';

export const getReview = async () => {
  try {
    const response = await axios.get("https://movie-review-platform-server.vercel.app/user/getallreviews", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
};