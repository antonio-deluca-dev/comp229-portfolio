import { Router } from "express";
import {
  getContacts,
  addContact,
  deleteContact,
} from "../controllers/contact.controller.js";
const router = Router();
router.get("/", getContacts);
router.post("/", addContact);
router.delete("/:id", deleteContact);
export default router;
