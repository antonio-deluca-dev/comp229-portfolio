// server/controllers/qualification.controller.js
import Qualification from "../models/qualification.model.js";

// GET /api/qualifications - public list
export const getQualifications = async (req, res) => {
  try {
    const quals = await Qualification.find().sort({ startYear: -1 });
    res.json(quals);
  } catch (err) {
    console.error("getQualifications error:", err);
    res.status(500).json({ message: "Failed to fetch qualifications" });
  }
};

// GET /api/qualifications/:id - public single
export const getQualificationById = async (req, res) => {
  try {
    const qual = await Qualification.findById(req.params.id);
    if (!qual) {
      return res.status(404).json({ message: "Qualification not found" });
    }
    res.json(qual);
  } catch (err) {
    console.error("getQualificationById error:", err);
    res.status(500).json({ message: "Failed to fetch qualification" });
  }
};

// POST /api/qualifications - admin only
export const createQualification = async (req, res) => {
  try {
    const { school, program, level, startYear, endYear, description } =
      req.body;

    if (!school || !program) {
      return res
        .status(400)
        .json({ message: "School and program are required" });
    }

    const qual = await Qualification.create({
      school,
      program,
      level,
      startYear,
      endYear,
      description,
    });

    res.status(201).json(qual);
  } catch (err) {
    console.error("createQualification error:", err);
    res.status(500).json({ message: "Failed to create qualification" });
  }
};

// PUT /api/qualifications/:id - admin only
export const updateQualification = async (req, res) => {
  try {
    const updated = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Qualification not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("updateQualification error:", err);
    res.status(500).json({ message: "Failed to update qualification" });
  }
};

// DELETE /api/qualifications/:id - admin only
export const deleteQualification = async (req, res) => {
  try {
    const deleted = await Qualification.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Qualification not found" });
    }
    res.json({ message: "Qualification deleted" });
  } catch (err) {
    console.error("deleteQualification error:", err);
    res.status(500).json({ message: "Failed to delete qualification" });
  }
};
