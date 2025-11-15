// server/controllers/contact.controller.js
import Contact from "../models/contact.model.js";

// GET /api/contacts  – list all
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("getContacts error:", err);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

// POST /api/contacts – create new
export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({ name, email, message });
    res.status(201).json(contact);
  } catch (err) {
    console.error("createContact error:", err);
    res.status(500).json({ message: "Failed to create contact" });
  }
};

// PUT /api/contacts/:id – update
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("updateContact error:", err);
    res.status(500).json({ message: "Failed to update contact" });
  }
};

// DELETE /api/contacts/:id – delete
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted" });
  } catch (err) {
    console.error("deleteContact error:", err);
    res.status(500).json({ message: "Failed to delete contact" });
  }
};
