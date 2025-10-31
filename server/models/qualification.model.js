import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema(
  {
    school: String,
    program: String,
    startYear: Number,
    endYear: Number,
  },
  { timestamps: true }
);

const Qualification = mongoose.model("Qualification", qualificationSchema);
export default Qualification;
