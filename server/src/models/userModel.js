import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    otpExpires: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
