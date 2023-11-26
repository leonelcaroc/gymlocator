import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const scheduleSchema = new mongoose.Schema({
  days: {
    type: Array,
    required: true,
  },
  time: {
    type: Array,
    required: true,
  },
});

const gymSchema = mongoose.Schema({
  gymname: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  schedule: {
    type: scheduleSchema,
    required: true,
  },
  permitBase64: {
    type: Buffer,
    required: true,
  },
});

const gymOwnerSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gym: {
      type: gymSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

gymOwnerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

gymOwnerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const GymOwner = mongoose.model("Gymowners", gymOwnerSchema);

export default GymOwner;
