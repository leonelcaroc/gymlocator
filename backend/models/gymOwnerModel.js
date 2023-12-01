import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const trainerSchema = mongoose.Schema({
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
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  certifications: {
    type: Array,
    default: [],
  },
  specialties: {
    type: Array,
    default: [],
  },
  experience: {
    type: Number,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
});

const classSchema = mongoose.Schema({
  classname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  starttime: {
    type: String,
    required: true,
  },
  endtime: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

const announcementSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const amenitySchema = mongoose.Schema({
  amenity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amenityImage: {
    type: String,
    required: true,
  },
});

const serviceSchema = mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  serviceImage: {
    type: String,
    required: true,
  },
});

const planSchema = mongoose.Schema({
  plan: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});

const equipmentSchema = mongoose.Schema({
  equipment: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  base64Data: {
    type: String,
    required: true,
  },
});

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
  gymLocation: {
    type: Array,
    required: true,
  },
  schedule: {
    type: scheduleSchema,
    required: true,
  },
  permitBase64: {
    type: String,
    required: true,
  },
  equipments: {
    type: [equipmentSchema],
    default: [],
  },
  plans: {
    type: [planSchema],
    default: [],
  },
  services: {
    type: [serviceSchema],
    default: [],
  },
  trainers: {
    type: [trainerSchema],
    default: [],
  },
  amenities: {
    type: [amenitySchema],
    default: [],
  },
  announcements: {
    type: [announcementSchema],
    default: [],
  },
  classes: {
    type: [classSchema],
    default: [],
  },
  isApproved: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    default: "pending",
  },
});

const gymOwnerSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    middlename: {
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

// [
//   { owner: 1, pricing: { monthly: 5000, annual: 10000 } },
//   { owner: 2, pricing: { semiannual: 8000, annual: 15000 } },
// ];
