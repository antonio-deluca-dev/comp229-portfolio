// server/routes/contact.routes.js
import express from "express";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller.js";
import { verifyToken, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// PUBLIC: create a contact (portfolio visitor)
router.post("/", createContact);

// ADMIN ONLY: list, update, delete contacts
router.get("/", verifyToken, adminOnly, getContacts);
router.put("/:id", verifyToken, adminOnly, updateContact);
router.delete("/:id", verifyToken, adminOnly, deleteContact);

export default router;
