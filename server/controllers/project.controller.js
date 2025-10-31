import Project from "../models/project.model.js";
export const getProjects = async (_req, res) =>
  res.json(await Project.find().sort({ createdAt: -1 }));
export const addProject = async (req, res) =>
  res.status(201).json(await Project.create(req.body));
