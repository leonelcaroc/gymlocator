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

const gymSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    gymname: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
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
    location: {
      type: Array,
    },
    permitBase64: {
      type: Buffer,
      required: true,
    },
    scheduleTime: {
      type: scheduleSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

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
    gyms: [gymSchema],
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
