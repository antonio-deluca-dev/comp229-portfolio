// server/controllers/user.controller.js
import User from "../models/user.model.js";

// GET /api/users - list all users (admin only)
export const getUsers = async (_req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("getUsers error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// GET /api/users/:id - get a single user (admin only)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("getUserById error:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// PUT /api/users/:id - update user (admin only)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // We don't allow direct password change here for simplicity
    const { name, email, role } = req.body;

    const updated = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("updateUser error:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// DELETE /api/users/:id - delete user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("deleteUser error:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
