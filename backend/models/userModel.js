import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const membershipSchema = mongoose.Schema(
  {
    gymId: {
      type: String,
      required: true,
    },
    plan: {
      type: {
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
        _id: false,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.Schema(
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
    memberships: {
      type: [membershipSchema],
      default: [],
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("Users", userSchema);

export default User;
