// server/routes/project.routes.js
import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { verifyToken, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// PUBLIC: anyone can see your projects
router.get("/", getProjects);
router.get("/:id", getProjectById);

// ADMIN ONLY: create, update, delete projects
router.post("/", verifyToken, adminOnly, createProject);
router.put("/:id", verifyToken, adminOnly, updateProject);
router.delete("/:id", verifyToken, adminOnly, deleteProject);

export default router;
