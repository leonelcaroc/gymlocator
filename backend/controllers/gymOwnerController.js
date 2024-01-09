import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import validator from "validator";
import GymOwner from "../models/gymOwnerModel.js";
import multer from "multer";
import createToken from "../utils/createToken.js";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "backend/uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
// });

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
    res.status(401).json({ message: "Invalid email or password" });

    throw new Error("Invalid email or password.");
  }
});

const registerOwner = asyncHandler(async (req, res) => {
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
    res.status(400);
    throw new Error("User already exists.");
  }
  const user = await GymOwner.create({
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
      schedule: { days: [startday, endday], time: [opentime, closetime] },
    },
  });

  if (user) {
    res.status(201).json({
      message: "Account Created Successfully!",
    });
  } else {
    res.status(400);
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

// desc     Get user profile
// route    GET /api/users/profile
// @access  Private
const getOwnerDashboard = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    members: user.gym.members,
  });
});

// desc     Get user profile
// route    GET /api/users/profile
// @access  Private
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
    // message: "Owner's Profile",
  });
});

// desc     Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateOwnerProfile = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

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
      message: "Successfuly updated user profile!",
    });
  } else {
    res.status(404);

    throw new Error("User not found");
  }

  // res.status(200).json({
  //   ,
  // });
});

const getGymDetails = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    gymname: req.user.gym.gymname,
    contact: req.user.gym.contact,
    address: req.user.gym.address,
    description: req.user.gym.description,
    schedule: req.user.gym.schedule,
  };

  res.status(200).json(user);
});

const updateGymDetails = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (user) {
    user.gym.gymname = req.body.gymname || user.gym.gymname;
    user.gym.contact = req.body.contact || user.gym.contact;
    user.gym.address = req.body.address || user.gym.address;
    user.gym.description = req.body.description || user.gym.description;
    user.gym.schedule.days[0] = req.body.startday || user.gym.schedule.days[0];
    user.gym.schedule.days[1] = req.body.endday || user.gym.schedule.days[1];
    user.gym.schedule.time[0] = req.body.opentime || user.gym.schedule.time[0];
    user.gym.schedule.time[1] = req.body.closetime || user.gym.schedule.time[1];

    // if (req.body.password) {
    //   user.password = req.body.password;
    // }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      gymname: updatedUser.gym.gymname,
      contact: updatedUser.gym.contact,
      address: updatedUser.gym.address,
      description: updatedUser.gym.description,
      schedule: updatedUser.gym.schedule,
    });
  } else {
    res.status(404);

    throw new Error("User not found");
  }

  res.status(200).json({
    message: "Updated user profile",
  });
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

const getGymEquipments = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    equipments: req.user.gym.equipments,
  };

  res.status(200).json(user);
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

const addGymServices = asyncHandler(async (req, res) => {
  try {
    const user = await GymOwner.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Extract the new equipment data from the request body
    const { service, description, base64Data } = req.body;

    const trimmedService = validator.trim(service);
    const trimmedDescription = validator.trim(description);

    if (!validator.isLength(trimmedService, { min: 1 })) {
      return res.status(400).json({ error: "Service name is required." });
    }

    if (!validator.isLength(trimmedDescription, { min: 1 })) {
      return res
        .status(400)
        .json({ error: "Service description is required." });
    }

    const newService = {
      service: trimmedService,
      description: trimmedDescription,
      serviceImage: base64Data,
    };

    // Add the new service to the existing service list
    user.gym.services.push(newService);

    // Save the updated user with the new service
    await user.save();

    // Respond with the updated user profile
    res.status(200).json({
      message: "Successfully added new service",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getGymServices = asyncHandler(async (req, res) => {
  const user = {
    services: req.user.gym.services,
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

const addGymAmenities = asyncHandler(async (req, res) => {
  try {
    const user = await GymOwner.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Extract the new equipment data from the request body
    const { amenity, description, amenityImage } = req.body;

    const trimmedAmenity = validator.trim(amenity);
    const trimmedDescription = validator.trim(description);

    if (!validator.isLength(trimmedAmenity, { min: 1 })) {
      return res.status(400).json({ error: "Amenity name is required." });
    }

    if (!validator.isLength(trimmedDescription, { min: 1 })) {
      return res
        .status(400)
        .json({ error: "Amenity description is required." });
    }

    const newAmenity = {
      amenity: trimmedAmenity,
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getGymAmenities = asyncHandler(async (req, res) => {
  const user = {
    amenities: req.user.gym.amenities,
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
  addGymEquipments,
  getGymEquipments,
  addGymPlans,
  getGymPlans,
  addGymServices,
  getGymServices,
  addGymTrainers,
  getGymTrainers,
  getStripePrices,
  addGymAmenities,
  getGymAmenities,
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
