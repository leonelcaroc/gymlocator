import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import validator from "validator";
import GymOwner from "../models/gymOwnerModel.js";

let stepData = {};

// desc     Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authOwner = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await GymOwner.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });

    throw new Error("Invalid email or password.");
  }
});

// desc     Register a new user
// route    POST /api/users
// @access  Public
//---------------------
// const registerOwner = asyncHandler(async (req, res) => {
//   const { firstname, lastname, email, password } = req.body;

//   // const trimmedName = validator.trim(name);
//   // const trimmedPassword = validator.trim(password);

//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ error: "Invalid email address" });
//   }

//   if (!validator.isLength(password, { min: 8, max: 16 })) {
//     return res
//       .status(400)
//       .json({ error: "Password must be between 6 and 8 characters" });
//   }

//   if (!validator.matches(password, /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)) {
//     return res.status(400).json({
//       error: "Password must contain at least one special character (!@#$%^&*)",
//     });
//   }

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists.");
//   }

//   const user = await User.create({
//     email,
//     name,
//     password,
//   });

//   if (user) {
//     generateToken(res, user._id);
//     res.status(201).json({
//       message: "Account Created",
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data.");
//   }
// });

const registerOwnerStepOne = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const trimmedFirstName = validator.trim(firstname);
  const trimmedLastName = validator.trim(lastname);
  const trimmedPassword = validator.trim(password);

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (!validator.isLength(trimmedFirstName, { min: 1 })) {
    return res.status(400).json({ error: "First name is required." });
  }

  if (!validator.isLength(trimmedLastName, { min: 1 })) {
    return res.status(400).json({ error: "Last name is required." });
  }

  if (
    !validator.isLength(trimmedPassword, { min: 8, max: 16 }) ||
    !validator.matches(trimmedPassword, /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
  ) {
    return res.status(400).json({
      error:
        "Password must be between 8 and 16 characters and contain at least one special character (!@#$%^&*)",
    });
  }

  stepData = {
    firstName: trimmedFirstName,
    lastName: trimmedLastName,
    email: email,
    password: trimmedPassword,
  };

  const userExists = await GymOwner.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  } else {
    res.status(200).json({ message: "First step completed" });
  }
});

const registerOwnerStepTwo = asyncHandler(async (req, res) => {
  const {
    gymname,
    contact,
    address,
    desc,
    startday,
    endday,
    opentime,
    closetime,
  } = req.body;

  const trimmedGymName = validator.trim(gymname);
  const trimmedContact = validator.trim(contact);
  const trimmedDesc = validator.trim(desc);
  const trimmedAddress = validator.trim(address);

  if (!validator.isLength(trimmedGymName, { min: 1 })) {
    return res.status(400).json({ error: "Gym name is required." });
  }

  if (!validator.isLength(trimmedContact, { min: 11, max: 11 })) {
    return res.status(400).json({ error: "Contact number is invalid" });
  }

  if (!validator.isLength(trimmedDesc, { min: 1 })) {
    return res.status(400).json({ error: "Gym Description is required." });
  }

  if (!validator.isLength(trimmedAddress, { min: 1 })) {
    return res.status(400).json({ error: "Gym Address is required." });
  }

  //   const isValidTime = (time) => {
  //     const timeRegex = /^(0[0-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
  //     return timeRegex.test(time);
  //   };

  //   if (!isValidTime(opentime || closetime)) {
  //     return res.status(400).json({ error: "Time is invalid." });
  //   }

  stepData = {
    ...stepData,
    gyms: [
      {
        gymname: trimmedGymName,
        contact: trimmedContact,
        desc: trimmedDesc,
        address: trimmedAddress,
        schedule: { days: [startday, endday], time: [opentime, closetime] },
      },
    ],
  };

  //   res.status(200).json({ message: "Second step completed" });
  res.status(200).json({ stepData });
});

const registerOwnerStepThree = asyncHandler(async (req, res) => {
  const { base64Data } = req.body;

  //   if (!validator.isBase64(base64Data)) {
  //     return res.status(400).json({ error: "Invalid Base64 data." });
  //   }

  stepData = {
    ...stepData,
    gyms: [
      {
        ...stepData.gyms[0],
        permitBase64: base64Data,
      },
    ],
  };

  const user = await GymOwner.create({ ...stepData });

  if (user) {
    res.status(201).json({
      message: "Account Created",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }

  res.status(200).json({ stepData });
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
const getOwnerProfile = asyncHandler(async (req, res) => {
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
const updateOwnerProfile = asyncHandler(async (req, res) => {
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
  authOwner,
  registerOwnerStepOne,
  registerOwnerStepTwo,
  registerOwnerStepThree,
  logoutOwner,
  getOwnerProfile,
  updateOwnerProfile,
};
