import express from "express";
import {
  signinUser,
  signoutUser,
  createAdmin,
} from "../controllers/auth.controller.js";

const router = express.Router();

// SIGN IN
router.post("/signin", signinUser);

// SIGN OUT
router.get("/signout", signoutUser);

// TEMP — CREATE ADMIN USER
router.get("/create-admin", createAdmin);

export default router;
