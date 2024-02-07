import axiosInstance from "../axiosConfig";
import TokenService from "../../services/token";

const privateUserApi = axiosInstance.create({
  baseURL: `${axiosInstance.defaults.baseURL}/users`,
});

privateUserApi.interceptors.request.use(
  (config) => {
    // Retrieve the JWT token from your storage (e.g., cookies, localStorage, etc.)
    // const jwtToken = TokenService.getLocal("adminInfo");
    const jwtToken = JSON.parse(TokenService.getUserLocal()).token;

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

export const getUserProfile = async () => {
  try {
    const { data } = await privateUserApi.get("/profile");
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (
  firstname,
  middlename,
  lastname,
  dateOfBirth,
  contact,
  address
) => {
  try {
    const { data } = await privateUserApi.patch("/profile", {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      dateOfBirth: dateOfBirth,
      contact: contact,
      address: address,
    });
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export default privateUserApi;
