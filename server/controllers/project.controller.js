// server/controllers/project.controller.js
import Project from "../models/project.model.js";

// GET /api/projects - list all
export const getProjects = async (_req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("getProjects error:", err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// GET /api/projects/:id - single project
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.error("getProjectById error:", err);
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

// POST /api/projects - create
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error("createProject error:", err);
    res.status(500).json({ message: "Failed to create project" });
  }
};

// PUT /api/projects/:id - update
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("updateProject error:", err);
    res.status(500).json({ message: "Failed to update project" });
  }
};

// DELETE /api/projects/:id - delete
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("deleteProject error:", err);
    res.status(500).json({ message: "Failed to delete project" });
  }
};
