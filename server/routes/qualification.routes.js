import { Router } from "express";
import {
  getQualifications,
  addQualification,
} from "../controllers/qualification.controller.js";
const router = Router();
router.get("/", getQualifications);
router.post("/", addQualification);
export default router;
