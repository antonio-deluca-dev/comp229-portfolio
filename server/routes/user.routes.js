// server/routes/user.routes.js
import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// All user management is admin-only
router.get("/", verifyToken, adminOnly, getUsers);
router.get("/:id", verifyToken, adminOnly, getUserById);
router.put("/:id", verifyToken, adminOnly, updateUser);
router.delete("/:id", verifyToken, adminOnly, deleteUser);

export default router;
