import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
      minlength: 100,
    },
    status: {
      type: String,
      enum: ["applied", "interview", "rejected"],
      default: "applied",
      required: true,
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
