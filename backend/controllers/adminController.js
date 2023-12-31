import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import validator from "validator";
import Admin from "../models/adminModel.js";
import GymOwner from "../models/gymOwnerModel.js";
import createToken from "../utils/createToken.js";

// desc     Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

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

// desc     Register a new user
// route    POST /api/users
// @access  Public
// const registerAdmin = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ error: "Invalid email address" });
//   }

//   if (!validator.isLength(password, { min: 6, max: 16 })) {
//     return res
//       .status(400)
//       .json({ error: "Password must between 6 and 16 character length" });
//   }

//   const userEmailExists = await Admin.findOne({ email });

//   if (userEmailExists) {
//     res.status(400);
//     throw new Error("Email already exists.");
//   }

//   const user = await Admin.create({
//     email,
//     password,
//   });

//   if (user) {
//     res.status(201).json({
//       message: "Account Created",
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data.");
//   }
// });

// desc     Logout user
// route    POST /api/users/logout
// @access  Public
const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Admin logged out" });
});

// desc     Get user profile
// route    GET /api/users/profile
// @access  Private
const getOwners = asyncHandler(async (req, res) => {
  const user = await GymOwner.find({});

  // res.status(200).json(user);
  res.status(200).json(user);
});

// desc     Update user profile
// route    PUT /api/users/profile
// @access  Private
const approveGymStatus = asyncHandler(async (req, res) => {
  const id = req.body.id;

  const user = await GymOwner.findById(id);

  if (user) {
    user.gym.isApproved = "approved";

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      status: updatedUser.gym.isApproved,
      message: "Gym Status Successfully Changed!!",
    });
  } else {
    res.status(404);

    throw new Error("User not found");
  }

  res.status(200).json({ user, message: "Gym Status Successful Changed!!" });
});

const rejectGymStatus = asyncHandler(async (req, res) => {
  const id = req.body.id;

  const user = await GymOwner.findById(id);

  if (user) {
    user.gym.isApproved = "rejected";

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      status: updatedUser.gym.isApproved,
      message: "Gym Status Successfully Changed!!",
    });
  } else {
    res.status(404);

    throw new Error("User not found");
  }

  res.status(200).json({ user, message: "Gym Status Successful Changed!!" });
});

export { authAdmin, logoutAdmin, getOwners, approveGymStatus, rejectGymStatus };
