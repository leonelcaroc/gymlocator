import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import validator from "validator";
import GymOwner from "../models/gymOwnerModel.js";

// let stepData = {};

// desc     Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authOwner = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await GymOwner.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      message: "Successfully Login",
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

//   const trimmedFirstName = validator.trim(firstname);
//   const trimmedLastName = validator.trim(lastname);
//   const trimmedPassword = validator.trim(password);

//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ error: "Invalid email address" });
//   }

//   if (!validator.isLength(trimmedPassword, { min: 8, max: 16 })) {
//     return res
//       .status(400)
//       .json({ error: "Password must be between 6 and 8 characters" });
//   }

//   if (
//     !validator.matches(trimmedPassword, /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
//   ) {
//     return res.status(400).json({
//       error: "Password must contain at least one special character (!@#$%^&*)",
//     });
//   }

//   const userExists = await GymOwner.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists.");
//   }

//   const user = await GymOwner.create({
//     email,
//     firstname: trimmedFirstName,
//     lastname: trimmedLastName,
//     password: trimmedPassword,
//   });

//   if (user) {
//     // generateToken(res, user._id);
//     res.status(201).json({
//       message: "Account Created",
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data.");
//   }
// });

const registerOwnerStep = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    gymname,
    contact,
    address,
    description,
    startday,
    endday,
    opentime,
    closetime,
    base64Data,
  } = req.body;

  const trimmedFirstName = validator.trim(firstname);
  const trimmedLastName = validator.trim(lastname);
  const trimmedPassword = validator.trim(password);
  const trimmedGymName = validator.trim(gymname);
  const trimmedContact = validator.trim(contact);
  const trimmedDesc = validator.trim(description);
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

  const newOwner = {
    firstName: trimmedFirstName,
    lastName: trimmedLastName,
    email: email,
    password: trimmedPassword,
    gym: {
      gymname: trimmedGymName,
      contact: trimmedContact,
      description: trimmedDesc,
      address: trimmedAddress,
      permitBase64: base64Data,
      schedule: { days: [startday, endday], time: [opentime, closetime] },
    },
  };

  const userExists = await GymOwner.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }
  const user = await GymOwner.create({
    firstname: trimmedFirstName,
    lastname: trimmedLastName,
    email: email,
    password: trimmedPassword,
    gym: {
      gymname: trimmedGymName,
      contact: trimmedContact,
      description: trimmedDesc,
      address: trimmedAddress,
      permitBase64: base64Data,
      schedule: { days: [startday, endday], time: [opentime, closetime] },
    },
  });

  if (user) {
    res.status(201).json({
      message: "Account Created",
      // ...newOwner,
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
const getOwnerProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
  };

  res.status(200).json(user);
});

// desc     Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateOwnerProfile = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;

    // if (req.body.password) {
    //   user.password = req.body.password;
    // }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
    });
  } else {
    res.status(404);

    throw new Error("User not found");
  }

  res.status(200).json({
    message: "Updated user profile",
  });
});

const addNewGym = asyncHandler(async (req, res) => {
  const user = await GymOwner.findById(req.user._id);

  if (user) {
    // Assuming req.body contains gym information, adjust accordingly
    const newGym = {
      gymname: req.body.gymname,
      address: req.body.address,
      contact: req.body.contact,
      description: req.body.description,
      permitBase64: req.body.permitBase64,
      schedule: {
        days: [req.body.startday, req.body.endday],
        time: [req.body.opentime, req.body.closetime],
      },
    };

    user.gyms.push(newGym);

    const addGym = await user.save();

    res.status(200).json({
      message: "New gym added",
      addGym,
    });
  } else {
    res.status(404);

    throw new Error("User not found");
  }
});

export {
  authOwner,
  registerOwnerStep,
  // registerOwnerStepTwo,
  // registerOwnerStepThree,
  // registerOwner,
  logoutOwner,
  getOwnerProfile,
  updateOwnerProfile,
  addNewGym,
};
