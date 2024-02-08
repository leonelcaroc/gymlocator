import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const memberPlanSchema = mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  planStatus: {
    type: String,
    enum: ["active", "expired", "pending", "cancelled"],
    // default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "cancelled", "pending"],
  },
  _id: false,
});

const memberSchema = mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    plan: {
      type: memberPlanSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const specialtySchema = mongoose.Schema({
  specialtyName: {
    type: String,
    required: true,
  },
});

const certificationSchema = mongoose.Schema({
  certificateName: {
    type: String,
    required: true,
  },
});

const trainerSchema = mongoose.Schema({
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
    type: [certificationSchema],
    default: [],
  },
  specialties: {
    type: [specialtySchema],
    default: [],
  },
  yearsOfExperience: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
});

// const classSchema = mongoose.Schema(
//   {
//     classname: {
//       type: String,
//       required: true,
//     },
//     instructor: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     starttime: {
//       type: String,
//       required: true,
//     },
//     endtime: {
//       type: String,
//       required: true,
//     },
//     capacity: {
//       type: Number,
//       required: true,
//     },
//     joinedMember: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     equipment: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const announcementSchema = mongoose.Schema({
  announcement: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const amenitySchema = mongoose.Schema({
  amenityName: {
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
  serviceName: {
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
  planName: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const equipmentSchema = mongoose.Schema({
  equipmentName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  equipmentImage: {
    type: String,
    required: true,
  },
});

const scheduleSchema = mongoose.Schema({
  startday: {
    type: String,
    required: true,
  },
  endday: {
    type: String,
    required: true,
  },
  opentime: {
    type: String,
    required: true,
  },
  closetime: {
    type: String,
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
    type: Array,
    default: [],
  },
  isApproved: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    default: "pending",
  },
  members: {
    type: [memberSchema],
    default: [],
  },
  reviews: {
    type: Array,
    default: [],
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
