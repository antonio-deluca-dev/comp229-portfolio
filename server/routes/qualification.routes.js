// server/routes/qualification.routes.js
import express from "express";
import {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
} from "../controllers/qualification.controller.js";
import { verifyToken, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// Logged-in users can view
router.get("/", verifyToken, getQualifications);
router.get("/:id", verifyToken, getQualificationById);

// Admin-only can modify
router.post("/", verifyToken, adminOnly, createQualification);
router.put("/:id", verifyToken, adminOnly, updateQualification);
router.delete("/:id", verifyToken, adminOnly, deleteQualification);

export default router;
