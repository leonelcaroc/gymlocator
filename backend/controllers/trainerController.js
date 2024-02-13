import asyncHandler from "express-async-handler";
// import generateToken from "../utils/generateToken.js";
// import validator from "validator";
// import User from "../models/userModel.js";
// import GymOwner from "../models/gymOwnerModel.js";
// import Class from "../models/classModel.js";
import Trainer from "../models/trainerModel.js";
// import calculateEndTime from "../utils/calculateEndTime.js";
// import { ObjectId } from "mongodb";
import Class from "../models/classModel.js";
import createToken from "../utils/createToken.js";
// import stringifySafe from "json-stringify-safe";

const authTrainer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Trainer.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "Email is not yet registered." });
  }

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

const getMyClasses = asyncHandler(async (req, res) => {
  const user = await Trainer.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const assignedClasses = await Class.find({
    _id: { $in: user.classes },
  }).exec(); // Use exec() to execute the query and return a promise

  res.status(200).json(assignedClasses);
});

export { authTrainer, getMyClasses };
