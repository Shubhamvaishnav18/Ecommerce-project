import User from "../models/userModel.js";

export const login = async (req, res) => {
  const { email } = req.body;

  const otp = "123456"; // mock OTP
  const expires = new Date(Date.now() + 5 * 60000);

  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email });

  user.otp = otp;
  user.otpExpires = expires;
  await user.save();

  res.json({ message: "OTP sent", otp });
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  res.json({ message: "Login successful" });
};
