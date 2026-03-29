import express from "express";
import auth from "../middleware/auth.js";
import Paste from "../models/Paste.js";
import { generatePastePDF } from "../controllers/pdfController.js";

const router = express.Router();

/* 📄 LIST USER PASTES */
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id || req.user.userId;

    const pastes = await Paste.find({ userId }).sort({ createdAt: -1 });
    res.json(pastes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* 👁 VIEW PDF (INLINE) */
router.get("/view/:id", auth, async (req, res, next) => {
  res.setHeader("Content-Disposition", "inline");
  next();
}, generatePastePDF);

/* ⬇ DOWNLOAD PDF */
router.get("/download/:id", auth, generatePastePDF);

export default router;
