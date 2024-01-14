import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import validator from "validator";
import GymOwner from "../models/gymOwnerModel.js";
import formidable from "formidable";

import createToken from "../utils/createToken.js";
import isValid24HourTime from "../utils/validateTime.js";
import fs from "fs";
import path from "path";
import multer from "multer";
// import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { multerUpload } from "../utils/multerUpload.js";

// desc     Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authOwner = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await GymOwner.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      message: "Login Successful!",
      token,
    });
  } else {
    res.status(401).json({ error: "Invalid email or password" });

    throw new Error("Invalid email or password.");
  }
});

const registerOwner = asyncHandler(async (req, res) => {
  const newMongoDbUserId = new ObjectId();
  const {
    firstname,
    middlename,
    lastname,
    email,
    password,
    gymname,
    contact,
    address,
    gymLocation,
    description,
    startday,
    endday,
    opentime,
    closetime,
    base64Data,
  } = req.body;

  const trimmedFirstName = validator.trim(firstname);
  const trimmedMiddleName = validator.trim(middlename);
  const trimmedLastName = validator.trim(lastname);
  const trimmedPassword = validator.trim(password);
  const trimmedGymName = validator.trim(gymname);
  const trimmedContact = validator.trim(contact);
  const trimmedDesc = validator.trim(description);
  const trimmedAddress = validator.trim(address);

  if (!validator.isLength(trimmedGymName, { min: 1 })) {
    return res.status(400).json({ error: "Gym name is required." });
  }

  if (!validator.isLength(trimmedContact, { min: 1 })) {
    return res.status(400).json({ error: "Contact number is invalid" });
  }

  if (!Array.isArray(gymLocation)) {
    return res.status(400).json({ error: "Location is invalid" });
  }

  if (!validator.isLength(trimmedDesc, { min: 1 })) {
    return res.status(400).json({ error: "Gym Description is required." });
  }

  if (!validator.isLength(trimmedAddress, { min: 1 })) {
    return res.status(400).json({ error: "Gym Address is required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (!validator.isLength(trimmedFirstName, { min: 1 })) {
    return res.status(400).json({ error: "First name is required." });
  }

  if (!validator.isLength(trimmedMiddleName, { min: 1 })) {
    return res.status(400).json({ error: "Middle name is required." });
  }

  if (!validator.isLength(trimmedLastName, { min: 1 })) {
    return res.status(400).json({ error: "Last name is required." });
  }

  const hasUpperCase = /[A-Z]/.test(trimmedPassword);
  const hasLowerCase = /[a-z]/.test(trimmedPassword);
  const hasDigit = /\d/.test(trimmedPassword);

  if (
    !validator.isLength(trimmedPassword, { min: 8 }) ||
    !(hasUpperCase && hasLowerCase && hasDigit)
  ) {
    return res.status(400).json({
      error:
        "Password must be atleast 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit.",
    });
  }

  const userExists = await GymOwner.findOne({ email });

  if (userExists) {
    res.status(400).json({ error: "User already exists." });
    throw new Error("User already exists.");
  }
  const newUser = await GymOwner.create({
    _id: newMongoDbUserId,
    firstname: trimmedFirstName,
    middlename: trimmedMiddleName,
    lastname: trimmedLastName,
    email: email,
    password: trimmedPassword,
    gym: {
      gymname: trimmedGymName,
      contact: trimmedContact,
      description: trimmedDesc,
      address: trimmedAddress,
      gymLocation: gymLocation,
      permitBase64: base64Data,
      schedule: {
        startday: startday,
        endday: endday,
        opentime: opentime,
        closetime: closetime,
      },
    },
  });

  if (newUser) {
    const mainFolderPath = path.join(
      process.cwd(),
      "backend",
      "uploads",
      newMongoDbUserId.toString()
    );

    const subfolders = ["permit", "services", "amenities", "equipments"];

    try {
      // Create the main folder if it doesn't exist
      if (!fs.existsSync(mainFolderPath)) {
        await fs.promises.mkdir(mainFolderPath);

        // Create subfolders
        for (const subfolder of subfolders) {
          const subfolderPath = path.join(mainFolderPath, subfolder);
          await fs.promises.mkdir(subfolderPath);
          // Additional logic for each subfolder can be added here
        }

        res.status(201).json({
          message: "Account Created Successfully!",
        });
      } else {
        res.status(400).json({ error: "Folder is already existing." });
        throw new Error("Folder is already existing.");
      }
    } catch (error) {
      // Handle the error appropriately
      console.error("Error creating folders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "Invalid user data." });
    throw new Error("Invalid user data.");
  }
});

// desc     Logout user
// route    POST /api/users/logout
// @access  Public
const logoutOwner = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

// GYM OWNER DASHBOARD  //

const getOwnerDashboard = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    throw new Error("User not found");
  }

  res.status(200).json({
    members: user.gym.members,
  });
});

// GYM OWNER PROFILE //

const getOwnerProfile = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  });
});

const updateOwnerProfile = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const trimmedFirstName = validator.trim(req.body.firstname);
  const trimmedLastName = validator.trim(req.body.lastname);

  if (!trimmedFirstName || !trimmedLastName) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (user) {
    user.firstname = trimmedFirstName || user.firstname;
    user.lastname = trimmedLastName || user.lastname;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.status(200).json({
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      message: "Successfuly updated owner profile!",
    });
  } else {
    res.status(404);

    throw new Error("User not found");
  }
});

// GYM DETAILS //

const getGymDetails = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    gymname: user.gym.gymname,
    address: user.gym.address,
    contact: user.gym.contact,
    description: user.gym.description,
    schedule: user.gym.schedule,
    time: user.gym.time,
  });
});

const updateGymDetails = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const {
    gymname,
    address,
    contact,
    description,
    startday,
    endday,
    opentime,
    closetime,
  } = req.body;

  const trimmedGymName = validator.trim(gymname);
  const trimmedAddress = validator.trim(address);
  const trimmedContact = validator.trim(contact);
  const trimmedDescription = validator.trim(description);

  if (!validator.isLength(trimmedGymName, { min: 1 })) {
    return res.status(400).json({ error: "Gym name is required." });
  }

  if (!validator.isLength(trimmedAddress, { min: 1 })) {
    return res.status(400).json({ error: "Gym address is required." });
  }

  if (!validator.isLength(trimmedContact, { min: 1 })) {
    return res.status(400).json({ error: "Gym contact is required." });
  }

  if (!validator.isLength(trimmedDescription, { min: 1 })) {
    return res.status(400).json({ error: "Gym description is required." });
  }

  if (!isValid24HourTime(opentime)) {
    res.status(400).json({ message: `${opentime} is not a valid time.` });
  }

  if (!isValid24HourTime(closetime)) {
    res.status(400).json({ message: `${closetime} is not a valid time.` });
  }

  if (user) {
    user.gym.gymname = trimmedGymName || user.gym.gymname;
    user.gym.address = trimmedAddress || user.gym.address;
    user.gym.contact = trimmedContact || user.gym.contact;
    user.gym.description = trimmedDescription || user.gym.description;
    user.gym.schedule.startday = startday || user.gym.schedule.startday;
    user.gym.schedule.endday = endday || user.gym.schedule.endday;
    user.gym.schedule.opentime = opentime || user.gym.schedule.opentime;
    user.gym.schedule.closetime = closetime || user.gym.schedule.closetime;

    const updatedUser = await user.save();

    res.status(200).json({
      gymname: updatedUser.gym.gymname,
      address: updatedUser.gym.address,
      contact: updatedUser.gym.contact,
      description: updatedUser.gym.description,
      startday: updatedUser.gym.schedule.startday,
      endday: updatedUser.gym.schedule.endday,
      opentime: updatedUser.gym.schedule.opentime,
      closetime: updatedUser.gym.schedule.closetime,
      message: "Successfuly updated gym details!",
    });
  } else {
    res.status(404);

    throw new Error("User not found");
  }
});

// SERVICES //

const getGymServices = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    throw new Error("User not found");
  }

  res.status(200).json(user.gym.services);
});

const addGymServices = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  // const form = formidable({ multiples: true });

  // form.uploadDir = path.join(
  //   __dirname,
  //   `backend/uploads/${req.user._id}/services`
  // );

  // form.parse(req, (err, fields, files) => {
  //   if (err) {
  //     console.error("Error parsing form data:", err);
  //     res.status(500).send("Internal Server Error");
  //     return;
  //   }

  //   // Extract values from req.body
  //   const { serviceName, description } = fields;
  //   const serviceImage = files.serviceImage;

  //   // if (serviceName[0] === "King") {
  //   //   uploadFile();
  //   // }
  //   // -----------------------
  //   const newFilePath = path.join(__dirname, "uploads", serviceImage.name);
  //   fs.rename(serviceImage.path, newFilePath, (err) => {
  //     if (err) {
  //       console.error("Error moving file:", err);
  //       res.status(500).send("Internal Server Error");
  //       return;
  //     }

  //     console.log("File uploaded successfully:", newFilePath);

  //     // Continue with your processing logic
  //     // ...

  //     res.status(200).send("File uploaded successfully");
  //   });

  //   res.status(200).send("Received form data successfully");
  // });

  // -------------------------------------------------------

  // Upload Service Image

  // multerUpload("services").single("serviceImage")(req, res, async (err) => {
  //   if (err) {
  //     // Handle multer errors
  //     console.error("Multer error:", err);
  //     return res.status(400).json({ error: "File upload failed" });
  //   }
  // });

  // -----------------------

  // throw new Error("You failed");

  // Extract the new service data from the request body
  // const { serviceName, description } = req.body;
  // const serviceImage = req.file;

  // if (!user) {
  //   res.status(404).json({ error: "User not found" });
  //   throw new Error("User not found");
  // }

  // console.log(serviceName);
  // console.log(serviceImage);

  // if (!serviceImage) {
  //   res.status(400).json({ error: "No file uploaded" });
  //   throw new Error("No file uploaded");
  // } else {
  //   res.status(200).json({ message: "File is uploaded" });
  // }

  // console.log({
  //   serviceName: serviceName,
  //   description: description,
  //   serviceImage: serviceImage,
  //   serviceType: "services",
  // });

  // throw new Error("You failed");

  // console.log(req.file);

  // ----------------

  // const trimmedServiceName = validator.trim(serviceName);
  // const trimmedDescription = validator.trim(description);

  // if (!validator.isLength(trimmedServiceName, { min: 1 })) {
  //   return res.status(400).json({ error: "Service name is invalid." });
  // }

  // if (!validator.isLength(trimmedDescription, { min: 1 })) {
  //   return res.status(400).json({ error: "Service description is invalid." });
  // }

  // const newService = {
  //   serviceName: trimmedServiceName,
  //   description: trimmedDescription,
  //   serviceImage: serviceImage,
  // };

  // // Add the new service to the existing service list
  // user.gym.services.push(newService);

  // // Save the updated user with the new service
  // await user.save();

  // // Respond with the updated user profile
  // res.status(200).json({
  //   message: "Successfully added new service",
  // });
});

const updateGymServices = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    throw new Error("User not found");
  }

  const { id, serviceName, description, serviceImage } = req.body;

  const trimmedServiceName = validator.trim(serviceName);
  const trimmedServiceDescription = validator.trim(description);

  if (!validator.isLength(trimmedServiceName, { min: 1 })) {
    return res.status(400).json({ error: "Service name is invalid." });
  }

  if (!validator.isLength(trimmedServiceDescription, { min: 1 })) {
    return res.status(400).json({ error: "Service description is invalid." });
  }

  const index = user.gym.services.findIndex((service) => service.id === id);

  if (index !== -1) {
    // Update the service at the found index
    user.gym.services[index] = {
      id: id,
      serviceName: trimmedServiceName,
      description: trimmedServiceDescription,
      serviceImage: serviceImage,
    };

    // Save the updated user
    // const updatedService = await user.save();
    await user.save();

    res.status(200).json({ message: "Successfully updated a service!" });
  } else {
    res.status(404).json({ error: "Service not found" });
  }
});

const deleteGymServices = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);
  const { id } = req.body;

  if (!user) {
    res.status(404).json({ error: "User not found." });
  }

  const serviceToRemove = user.gym.services.find(
    (service) => service.id === id
  );

  if (!serviceToRemove) {
    res.status(404).json({ error: "Service not found." });
  }

  const remainingServices = user.gym.services.filter(
    (service) => service.id !== id
  );

  user.gym.services = [...remainingServices];

  await user.save();

  res.status(200).json({ message: "Successfully deleted service" });
});

// AMENITIES //

const getGymAmenities = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    throw new Error("User not found");
  }

  res.status(200).json(user.gym.amenities);
});

const addGymAmenities = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Extract the new equipment data from the request body
  const { amenityName, description, amenityImage } = req.body;

  // res.status(200).json({
  //   amenityName: amenityName,
  //   description: description,
  //   amenityImage: amenityImage,
  // });

  const trimmedAmenity = validator.trim(amenityName);
  const trimmedDescription = validator.trim(description);

  if (!validator.isLength(trimmedAmenity, { min: 1 })) {
    return res.status(400).json({ error: "Amenity name is required." });
  }

  if (!validator.isLength(trimmedDescription, { min: 1 })) {
    return res.status(400).json({ error: "Amenity description is required." });
  }

  const newAmenity = {
    amenityName: trimmedAmenity,
    description: trimmedDescription,
    amenityImage: amenityImage,
  };

  // Add the new service to the existing service list
  user.gym.amenities.push(newAmenity);

  // Save the updated user with the new service
  await user.save();

  // Respond with the updated user profile
  res.status(200).json({
    message: "Successfully added new amenity",
  });
});

const updateGymAmenities = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    throw new Error("User not found");
  }

  const { id, amenityName, description, amenityImage } = req.body;

  const trimmedAmenityName = validator.trim(amenityName);
  const trimmedAmenityDescription = validator.trim(description);

  if (!validator.isLength(trimmedAmenityName, { min: 1 })) {
    return res.status(400).json({ error: "Amenity name is invalid." });
  }

  if (!validator.isLength(trimmedAmenityDescription, { min: 1 })) {
    return res.status(400).json({ error: "Amenity description is invalid." });
  }

  const index = user.gym.amenities.findIndex((amenity) => amenity.id === id);

  if (index !== -1) {
    // Update the service at the found index
    user.gym.amenities[index] = {
      id: id,
      amenityName: trimmedAmenityName,
      description: trimmedAmenityDescription,
      amenityImage: amenityImage,
    };

    // Save the updated user
    // const updatedService = await user.save();
    await user.save();

    res.status(200).json({ message: "Successfully updated a amenity!" });
  } else {
    res.status(404).json({ error: "Amenity not found" });
  }
});

const deleteGymAmenities = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);
  const { id } = req.body;

  if (!user) {
    res.status(404).json({ error: "User not found." });
  }

  const amenityToRemove = user.gym.amenities.find(
    (amenity) => amenity.id === id
  );

  if (!amenityToRemove) {
    res.status(404).json({ error: "Amenity not found." });
  }

  const remainingAmenities = user.gym.amenities.filter(
    (amenity) => amenity.id !== id
  );

  user.gym.amenities = [...remainingAmenities];

  await user.save();

  res.status(200).json({ message: "Successfully deleted amenity" });
});

// EQUIPMENTS //

const getGymEquipments = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    throw new Error("User not found");
  }

  res.status(200).json(user.gym.equipments);
});

const addGymEquipments = asyncHandler(async (req, res) => {
  try {
    const user = await GymOwner.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Extract the new equipment data from the request body
    const { equipment, description, base64 } = req.body;

    const trimmedEquipment = validator.trim(equipment);
    const trimmedDescription = validator.trim(description);

    if (!validator.isLength(trimmedEquipment, { min: 1 })) {
      return res.status(400).json({ error: "Equipment name is required." });
    }

    if (!validator.isLength(trimmedDescription, { min: 1 })) {
      return res.status(400).json({ error: "Description is required." });
    }

    const newEquipment = {
      equipment: trimmedEquipment,
      description: trimmedDescription,
      base64Data: base64,
    };

    // Add the new equipment to the existing equipment list
    user.gym.equipments.push(newEquipment);

    // Save the updated user with the new equipment
    await user.save();

    // Respond with the updated user profile
    res.status(200).json({
      message: "Successfully added new equipment",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const addGymPlans = asyncHandler(async (req, res) => {
  try {
    const user = await GymOwner.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Extract the new equipment data from the request body
    const { plan, amount } = req.body;

    if (!validator.isNumeric(amount)) {
      return res.status(400).json({ error: "Amount must be a valid number." });
    }

    const validPlans = ["annual", "semi-annual", "monthly"];
    if (!validPlans.includes(plan)) {
      return res.status(400).json({
        error: "Invalid plan. Valid plans are: annual, semi-annual, monthly",
      });
    }

    const isPlanAlreadyAdded = user.gym.plans.some(
      (existingPlan) => existingPlan.plan === plan
    );

    if (isPlanAlreadyAdded) {
      return res.status(400).json({ error: "Plan is already present." });
    }

    // Add the new equipment to the existing equipment list
    user.gym.plans.push({
      plan: plan,
      amount: amount,
    });

    // Save the updated user with the new equipment
    await user.save();

    // Respond with the updated user profile
    res.status(200).json({
      message: "Successfully added new plan",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getGymPlans = asyncHandler(async (req, res) => {
  const user = {
    plans: req.user.gym.plans,
  };

  res.status(200).json(user);
});

const addGymTrainers = asyncHandler(async (req, res) => {
  try {
    const user = await GymOwner.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Extract the new equipment data from the request body
    const {
      firstname,
      lastname,
      email,
      contact,
      address,
      birthdate,
      gender,
      certifications,
      specialties,
      experience,
      biography,
    } = req.body;

    const trimmedFirstname = validator.trim(firstname);
    const trimmedLastname = validator.trim(lastname);
    const trimmedAddress = validator.trim(address);
    const trimmedBiography = validator.trim(biography);

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (!validator.isLength(trimmedFirstname, { min: 1 })) {
      return res.status(400).json({ error: "First name is required." });
    }

    if (!validator.isLength(trimmedLastname, { min: 1 })) {
      return res.status(400).json({ error: "Last name is required." });
    }

    if (!validator.isLength(trimmedAddress, { min: 1 })) {
      return res.status(400).json({ error: "Address is required." });
    }

    if (!validator.isLength(trimmedBiography, { min: 1 })) {
      return res.status(400).json({ error: "Biography is required." });
    }

    if (!validator.isLength(contact, { min: 11, max: 11 })) {
      return res.status(400).json({ error: "Contact is invalid." });
    }

    if (!validator.isNumeric(experience, { min: 11, max: 11 })) {
      return res.status(400).json({ error: "Experience is invalid." });
    }

    const newTrainer = {
      firstname: trimmedFirstname,
      lastname: trimmedLastname,
      email: email,
      contact: contact,
      address: trimmedAddress,
      dateOfBirth: birthdate,
      gender: gender,
      certifications: certifications,
      specialties: specialties,
      experience: experience,
      biography: trimmedBiography,
    };

    // Add the new service to the existing service list
    user.gym.trainers.push(newTrainer);

    // Save the updated user with the new service
    await user.save();

    // Respond with the updated user profile
    res.status(200).json({
      message: "Successfully added new trainer",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getGymTrainers = asyncHandler(async (req, res) => {
  const user = {
    trainers: req.user.gym.trainers,
  };

  res.status(200).json(user);
});

const addGymAnnouncement = asyncHandler(async (req, res) => {
  try {
    const user = await GymOwner.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Extract the new equipment data from the request body
    const { description } = req.body;

    const trimmedDescription = validator.trim(description);

    if (!validator.isLength(trimmedDescription, { min: 1 })) {
      return res
        .status(400)
        .json({ error: "Amenity description is required." });
    }

    const newAnnoucement = {
      description: trimmedDescription,
    };

    // Add the new service to the existing service list
    user.gym.announcements.push(newAnnoucement);

    // Save the updated user with the new service
    await user.save();

    // Respond with the updated user profile
    res.status(200).json({
      message: "Successfully added new announcement",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getGymAnnouncement = asyncHandler(async (req, res) => {
  const user = {
    announcements: req.user.gym.announcements,
  };

  res.status(200).json(user);
});

const addGymClasses = asyncHandler(async (req, res) => {
  try {
    const user = await GymOwner.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Extract the new equipment data from the request body
    const {
      classname,
      instructor,
      date,
      starttime,
      endtime,
      capacity,
      description,
      equipment,
    } = req.body;

    const trimmedClassName = validator.trim(classname);
    const trimmedDescription = validator.trim(description);
    const trimmedEquipment = validator.trim(equipment);

    if (!validator.isLength(trimmedDescription, { min: 1 })) {
      return res.status(400).json({ error: "Class description is required." });
    }

    if (!validator.isNumeric(capacity)) {
      return res.status(400).json({ error: "Capacity is invalid." });
    }

    const newClass = {
      classname: trimmedClassName,
      description: trimmedDescription,
      equipment: trimmedEquipment,
      instructor: instructor,
      date: date,
      starttime: starttime,
      endtime: endtime,
      capacity: capacity,
    };

    // Add the new service to the existing service list
    user.gym.classes.push(newClass);

    // Save the updated user with the new service
    await user.save();

    // Respond with the updated user profile
    res.status(200).json({
      message: "Successfully added new class",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getGymClasses = asyncHandler(async (req, res) => {
  const user = {
    classes: req.user.gym.classes,
  };

  res.status(200).json(user);
});

const getStripePrices = asyncHandler(async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  res.status(200).json(prices);
});

export {
  // upload,
  authOwner,
  registerOwner,
  logoutOwner,
  getOwnerDashboard,
  getOwnerProfile,
  updateOwnerProfile,
  getGymDetails,
  updateGymDetails,
  getGymServices,
  addGymServices,
  updateGymServices,
  deleteGymServices,
  getGymAmenities,
  addGymAmenities,
  updateGymAmenities,
  deleteGymAmenities,
  getGymEquipments,
  addGymEquipments,
  addGymPlans,
  getGymPlans,
  addGymTrainers,
  getGymTrainers,
  getStripePrices,
  addGymAnnouncement,
  getGymAnnouncement,
  addGymClasses,
  getGymClasses,
};

// user: {
//   _id: new ObjectId("6562e1b22670ffadafc8ff70"),
//   firstname: 'John',
//   lastname: 'Doe',
//   email: 'johndoe@gmail.com',
//   gym: {
//     gymname: 'Carlo Gym',
//     contact: '12345678910',
//     description: 'Hello welcome to my gym',
//     address: 'USA',
//     schedule: [Object],
//     permitBase64: Binary.createFromBase64("MTIzNDU2", 0),
//     _id: new ObjectId("6562e1b22670ffadafc8ff71")
//   }
// }
