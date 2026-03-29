import express from "express";
import Paste from "../models/Paste.js";
import auth from "../middleware/auth.js";
import {
  getPasteById,
  getAllPastes,
  updatePaste,
} from "../controllers/pasteController.js";
import { generatePastePDF } from "../controllers/pdfController.js";


const router = express.Router();

// Create paste
router.post("/", auth, async (req, res) => {
  try {
    const paste = await Paste.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id,
    });

    res.json(paste);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get user pastes
router.get("/", auth, async (req, res) => {
  const pastes = await Paste.find({ user: req.user._id });
  res.json(pastes);
});

router.get("/", getAllPastes);        // GET all
router.get("/:id", getPasteById);     // GET by ID (VIEW PAGE)
router.put("/:id", updatePaste);
router.get("/:id/pdf", generatePastePDF);
export default router;
