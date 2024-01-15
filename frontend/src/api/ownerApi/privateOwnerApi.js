import axiosInstance from "../axiosConfig";
import TokenService from "../../services/token";
import { add } from "date-fns";

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

export const updateGymDetails = async (
  gymname,
  address,
  contact,
  description,
  startday,
  endday,
  opentime,
  closetime
) => {
  try {
    const { data } = await privateOwnerApi.put("/gymdetails", {
      gymname: gymname,
      address: address,
      contact: contact,
      description: description,
      startday: startday,
      endday: endday,
      opentime: opentime,
      closetime: closetime,
    });
    return data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

// Gym Services API //

export const getGymServices = async () => {
  try {
    const { data } = await privateOwnerApi.get("/services");
    return data;
  } catch (error) {
    console.error("Error getting gym services:", error);
    throw error;
  }
};

export const addGymServices = async (formData) => {
  try {
    const { data } = await privateOwnerApi.post("/services", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
};

export const updateGymServices = async (
  id,
  serviceName,
  description,
  serviceImage
) => {
  try {
    const { data } = await privateOwnerApi.put("/services", {
      id: id,
      serviceName: serviceName,
      description: description,
      serviceImage: serviceImage,
    });
    return data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

export const deleteGymService = async (id) => {
  try {
    const { data } = await privateOwnerApi.delete("/services", {
      data: { id },
    });
    return data;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

// Amenities API

export const getGymAmenities = async () => {
  try {
    const { data } = await privateOwnerApi.get("/amenity");
    return data;
  } catch (error) {
    console.error("Error getting gym amenities:", error);
    throw error;
  }
};

export const addGymAmenities = async (formData) => {
  try {
    const { data } = await privateOwnerApi.post("/amenity", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Error adding amenity:", error);
    throw error;
  }
};

export const updateGymAmenities = async (
  id,
  amenityName,
  description,
  amenityImage
) => {
  try {
    const { data } = await privateOwnerApi.put("/amenity", {
      id: id,
      amenityName: amenityName,
      description: description,
      amenityImage: amenityImage,
    });
    return data;
  } catch (error) {
    console.error("Error updating amenity:", error);
    throw error;
  }
};

export const deleteGymAmenity = async (id) => {
  try {
    const { data } = await privateOwnerApi.delete("/amenity", {
      data: { id },
    });
    return data;
  } catch (error) {
    console.error("Error deleting amenity:", error);
    throw error;
  }
};

// Equipments API

export const getGymEquipments = async () => {
  try {
    const { data } = await privateOwnerApi.get("/equipments");
    return data;
  } catch (error) {
    console.error("Error getting gym equipments:", error);
    throw error;
  }
};

export const addGymEquipments = async (formData) => {
  try {
    const { data } = await privateOwnerApi.post("/equipments", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Error adding equipment:", error);
    throw error;
  }
};

export const updateGymEquipments = async (
  id,
  equipmentName,
  description,
  equipmentImage
) => {
  try {
    const { data } = await privateOwnerApi.put("/equipments", {
      id: id,
      equipmentName: equipmentName,
      description: description,
      equipmentImage: equipmentImage,
    });
    return data;
  } catch (error) {
    console.error("Error updating equipment:", error);
    throw error;
  }
};

export const deleteGymEquipment = async (id) => {
  try {
    const { data } = await privateOwnerApi.delete("/equipments", {
      data: { id },
    });
    return data;
  } catch (error) {
    console.error("Error deleting equipment:", error);
    throw error;
  }
};

// Announcement API

export const getGymAnnouncements = async () => {
  try {
    const { data } = await privateOwnerApi.get("/announcements");
    return data;
  } catch (error) {
    console.error("Error getting gym announcements:", error);
    throw error;
  }
};

export const addGymAnnouncements = async (announcement) => {
  try {
    const { data } = await privateOwnerApi.post("/announcements", {
      announcement: announcement,
    });
    return data;
  } catch (error) {
    console.error("Error adding announcement:", error);
    throw error;
  }
};

export const updateGymAnnouncements = async (announcement, id) => {
  try {
    const { data } = await privateOwnerApi.put("/announcements", {
      announcement: announcement,
      id: id,
    });
    return data;
  } catch (error) {
    console.error("Error updating announcement:", error);
    throw error;
  }
};

export const deleteGymAnnouncement = async (id) => {
  try {
    const { data } = await privateOwnerApi.delete("/announcements", {
      data: { id },
    });
    return data;
  } catch (error) {
    console.error("Error deleting equipment:", error);
    throw error;
  }
};

// Plans API

export const getGymPlans = async () => {
  try {
    const { data } = await privateOwnerApi.get("/plans");
    return data;
  } catch (error) {
    console.error("Error getting gym plans:", error);
    throw error;
  }
};

export const addGymPlans = async (planName, duration, amount) => {
  try {
    const { data } = await privateOwnerApi.post("/plans", {
      planName: planName,
      duration: duration,
      amount: amount,
    });
    return data;
  } catch (error) {
    console.error("Error adding plan:", error);
    throw error;
  }
};

export const updateGymPlans = async (id, planName, duration, amount) => {
  try {
    const { data } = await privateOwnerApi.put("/plans", {
      id: id,
      planName: planName,
      duration: duration,
      amount: amount,
    });
    return data;
  } catch (error) {
    console.error("Error updating plan:", error);
    throw error;
  }
};

export const deleteGymPlan = async (id) => {
  try {
    const { data } = await privateOwnerApi.delete("/plans", {
      data: { id },
    });
    return data;
  } catch (error) {
    console.error("Error deleting plan:", error);
    throw error;
  }
};

export default privateOwnerApi;
