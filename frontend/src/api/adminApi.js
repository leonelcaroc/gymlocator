// adminApi.js
import axiosInstance from "./axiosConfig";

const adminApi = axiosInstance.create({
  baseURL: `${axiosInstance.defaults.baseURL}/admin`,
});

// export const getAdminProfile = async () => {
//   try {
//     const { data } = await adminApi.get("/");
//     return data;
//   } catch (error) {
//     console.error("Error fetching admin profile:", error);
//     throw error;
//   }
// };

export const postLoginAdmin = async (email, password) => {
  try {
    const { data } = await adminApi.post("/auth", {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error("Error logging in admin:", error);
    throw error;
  }
};

export const postLogoutAdmin = async () => {
  try {
    const { data } = await adminApi.post("/logout");
    return data;
  } catch (error) {
    console.error("Error logging out admin:", error);
    throw error;
  }
};

export default adminApi;
