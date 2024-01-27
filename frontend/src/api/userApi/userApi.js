// adminApi.js
import axiosInstance from "../axiosConfig";

const userApi = axiosInstance.create({
  baseURL: `${axiosInstance.defaults.baseURL}/users`,
});

export const postRegisterUser = async (
  firstname,
  middlename,
  lastname,
  email,
  contact,
  address,
  dateOfBirth,
  plan,
  gender,
  password,
  gymId
) => {
  try {
    const { data } = await userApi.post("/register", {
      firstname,
      middlename,
      lastname,
      email,
      contact,
      address,
      dateOfBirth,
      plan,
      gender,
      password,
      gymId,
    });
    return data;
  } catch (error) {
    console.error("Error register user:", error);
    throw error;
  }
};

export default userApi;
