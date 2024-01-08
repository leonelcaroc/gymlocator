// adminApi.js
import axiosInstance from "../axiosConfig";

const ownerApi = axiosInstance.create({
  baseURL: `${axiosInstance.defaults.baseURL}/gymowner`,
});

export const postLoginOwner = async (email, password) => {
  try {
    const { data } = await ownerApi.post(
      "/auth",
      {
        email,
        password,
      }
      // { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error("Error logging in owner:", error);
    throw error;
  }
};

export const postLogoutOwner = async () => {
  try {
    const { data } = await adminApi.post("/logout");
    return data;
  } catch (error) {
    console.error("Error logging out owner:", error);
    throw error;
  }
};

export default ownerApi;
