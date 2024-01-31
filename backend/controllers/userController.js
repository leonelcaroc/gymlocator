import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import validator from "validator";
import User from "../models/userModel.js";
import GymOwner from "../models/gymOwnerModel.js";
import calculateEndTime from "../utils/calculateEndTime.js";
import { ObjectId } from "mongodb";
import createToken from "../utils/createToken.js";

// desc     Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

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

// desc     Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const newUserId = new ObjectId();

  const {
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
  } = req.body;

  const userEmailExists = await User.findOne({ email });

  if (userEmailExists) {
    res.status(400);
    throw new Error("Email already exists.");
  }

  const verifiedGymOwner = await GymOwner.findById(gymId);

  if (!verifiedGymOwner) {
    res.status(404);
    throw new Error("Gym not found");
  }

  const isPlanIdValid = verifiedGymOwner?.gym.plans.some(
    (gymPlan) => gymPlan._id.toString() === plan._id
  );

  if (!isPlanIdValid) {
    res.status(400);
    throw new Error("Gym plan doesn't exists to your chosen gym");
  }

  const trimmedFirstname = firstname.trim();
  const trimmedMiddlename = middlename.trim();
  const trimmedLastname = lastname.trim();
  const trimmedAddress = address.trim();
  const trimmedContact = contact.trim();

  function isValidDate(dateString) {
    return validator.isDate(dateString);
  }

  function isValidGender(gender) {
    const validGenders = ["Male", "Female"];
    return validGenders.includes(gender);
  }

  if (!validator.isLength(trimmedFirstname, { min: 1 })) {
    return res.status(400).json({ error: "First name is required." });
  }

  if (!validator.isLength(trimmedMiddlename, { min: 1 })) {
    return res.status(400).json({ error: "Middle name is required." });
  }

  if (!validator.isLength(trimmedLastname, { min: 1 })) {
    return res.status(400).json({ error: "Last name is required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (!validator.isLength(trimmedContact, { min: 1 })) {
    return res.status(400).json({ error: "Contact is required." });
  }

  if (!validator.isLength(trimmedAddress, { min: 1 })) {
    return res.status(400).json({ error: "Address is required." });
  }

  if (!isValidDate(dateOfBirth)) {
    return res.status(400).json({ error: "Invalid date of birth." });
  }

  if (!isValidGender(gender)) {
    return res
      .status(400)
      .json({ error: "Invalid gender. Valid values are 'Male' or 'Female'." });
  }

  if (!validator.isLength(password, { min: 8, max: 16 })) {
    return res
      .status(400)
      .json({ error: "Password must be between 8 and 16 characters" });
  }

  const membershipPlan = [
    {
      gymId: gymId,
      plan: {
        planName: plan.planName,
        amount: plan.amount,
        duration: plan.duration,
        startTime: Date.now(),
        endTime: calculateEndTime(plan.duration),
        planStatus: "active",
      },
    },
  ];

  const user = await User.create({
    _id: newUserId,
    firstname: trimmedFirstname,
    middlename: trimmedMiddlename,
    lastname: trimmedLastname,
    email: email,
    contact: trimmedContact,
    address: trimmedAddress,
    dateOfBirth: dateOfBirth,
    memberships: membershipPlan,
    gender: gender,
    password: password,
  });

  if (user) {
    verifiedGymOwner.gym.members.push({
      userId: newUserId,
      plan: {
        planName: plan.planName,
        amount: plan.amount,
        duration: plan.duration,
        startTime: Date.now(),
        endTime: calculateEndTime(plan.duration),
        planStatus: "active",
      },
    });
    await verifiedGymOwner.save();

    res.status(201).json({
      message: "Account Created",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

// ---------------------------------------------------------

// desc     Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

// desc     Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

// desc     Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);

    throw new Error("User not found");
  }

  res.status(200).json({ message: "Update user profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
