import { Router } from "express";
import { getProjects, addProject } from "../controllers/project.controller.js";
const router = Router();
router.get("/", getProjects);
router.post("/", addProject);
export default router;
