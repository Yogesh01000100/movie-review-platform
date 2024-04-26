import axios from "axios";

export const createSession = async (idToken) => {
  try {
    const response = await axios.post(
      "https://movie-review-platform-server.vercel.app/auth/createsessioncookie",
      {
        idToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      console.error("Failed to create session:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Error creating session:", error);
    return false;
  }
};

export const sessionLogout = async () => {
  const token = "_logout_token_";
  try {
    const response = await axios.post(
      "https://movie-review-platform-server.vercel.app/auth/signout",
      {
        token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const checkCookieSession = async () => {
  try {
    const response = await axios.get(
      "https://movie-review-platform-server.vercel.app/auth/sessionexists",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error checking session:", error.response.data);
    return null;
  }
};
