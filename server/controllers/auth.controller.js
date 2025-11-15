import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ----------------------------
// LOGIN USER
// ----------------------------
export const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------------------
// LOGOUT USER
// ----------------------------
export const signoutUser = (req, res) => {
  res.json({ message: "User signed out" });
};

// ----------------------------
// TEMP: CREATE ADMIN USER
// ----------------------------
export const createAdmin = async (req, res) => {
  try {
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123", // bcrypt will hash it automatically
      role: "admin",
    });

    res.json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
