import mongoose from "mongoose";

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
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  gymOwnerId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
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

const Trainer = mongoose.model("Trainers", trainerSchema);

export default Trainer;
