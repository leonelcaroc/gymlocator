import mongoose from "mongoose";

const classSchema = mongoose.Schema(
  {
    gymOwnerId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    classname: {
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
    joinedMember: {
      type: Array,
      required: true,
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Class = mongoose.model("Classes", classSchema);

export default Class;
