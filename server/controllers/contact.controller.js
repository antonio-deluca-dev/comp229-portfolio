import Contact from "../models/contact.model.js";

export const getContacts = async (_req, res) => {
  const items = await Contact.find().sort({ createdAt: -1 });
  res.json(items);
};

export const addContact = async (req, res) => {
  const created = await Contact.create(req.body);
  res.status(201).json(created);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  await Contact.findByIdAndDelete(id);
  res.json({ ok: true });
};
