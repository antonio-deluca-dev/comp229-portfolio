// server/models/qualification.model.js
import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema(
  {
    school: {
      type: String,
      required: true,
      trim: true,
    },
    program: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      default: "",
    },
    startYear: {
      type: Number,
    },
    endYear: {
      type: Number,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Qualification = mongoose.model("Qualification", qualificationSchema);
export default Qualification;
