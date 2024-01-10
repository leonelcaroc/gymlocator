import axiosInstance from "../axiosConfig";
import TokenService from "../../services/token";

const privateOwnerApi = axiosInstance.create({
  baseURL: `${axiosInstance.defaults.baseURL}/gymowner`,
});

privateOwnerApi.interceptors.request.use(
  (config) => {
    // Retrieve the JWT token from your storage (e.g., cookies, localStorage, etc.)
    // const jwtToken = TokenService.getLocal("adminInfo");
    const jwtToken = JSON.parse(TokenService.getOwnerLocal()).token;

    // If the token is available, add it to the Authorization header
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export const getOwnerProfile = async () => {
  try {
    const { data } = await privateOwnerApi.get("/profile");
    return data;
  } catch (error) {
    console.error("Error getting profile:", error);
    throw error;
  }
};

export const updateOwnerProfile = async (firstname, lastname, email) => {
  try {
    const { data } = await privateOwnerApi.put("/profile", {
      firstname: firstname,
      lastname: lastname,
      email: email,
    });
    return data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

export const getMembers = async () => {
  try {
    const { data } = await privateOwnerApi.get("/dashboard");
    return data;
  } catch (error) {
    console.error("Error getting members:", error);
    throw error;
  }
};

export const getGymDetails = async () => {
  try {
    const { data } = await privateOwnerApi.get("/gymdetails");
    return data;
  } catch (error) {
    console.error("Error getting gym details:", error);
    throw error;
  }
};

export default privateOwnerApi;