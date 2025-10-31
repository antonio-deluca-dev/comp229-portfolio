import Qualification from "../models/qualification.model.js";
export const getQualifications = async (_req, res) =>
  res.json(await Qualification.find().sort({ createdAt: -1 }));
export const addQualification = async (req, res) =>
  res.status(201).json(await Qualification.create(req.body));
