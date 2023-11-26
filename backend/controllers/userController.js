import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import validator from "validator";
import User from "../models/userModel.js";

// desc     Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      message: "Login Successfully",
    });
  } else {
    res.status(401).json({ message: "Invalid username or password" });

    throw new Error("Invalid username or password.");
  }
});

// desc     Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstname,
    middlename,
    lastname,
    gender,
    birthdate,
    address,
    phoneNumber,
    membershipType,
    membershipFee,
    payment,
    username,
    password,
    email,
  } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (!validator.isLength(password, { min: 8, max: 16 })) {
    return res
      .status(400)
      .json({ error: "Password must be between 6 and 8 characters" });
  }

  if (!validator.matches(password, /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)) {
    return res.status(400).json({
      error: "Password must contain at least one special character (!@#$%^&*)",
    });
  }

  const userEmailExists = await User.findOne({ email });
  const userNameExists = await User.findOne({ username });

  if (userEmailExists) {
    res.status(400);
    throw new Error("Email already exists.");
  }

  if (userNameExists) {
    res.status(400);
    throw new Error("Username already exists.");
  }

  const user = await User.create({
    firstname,
    middlename,
    lastname,
    gender,
    birthdate,
    address,
    phoneNumber,
    membershipType,
    membershipFee,
    payment,
    username,
    password,
    email,
  });

  if (user) {
    res.status(201).json({
      message: "Account Created",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

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
