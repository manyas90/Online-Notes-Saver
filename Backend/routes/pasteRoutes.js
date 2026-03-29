import express from "express";
import {
  getPasteById,
  getAllPastes,
  updatePaste,
} from "../controllers/pasteControllers.js";

const router = express.Router();

router.get("/", getAllPastes);     // GET all
router.get("/:id", getPasteById);  // GET one (view + edit)
router.put("/:id", updatePaste);   // UPDATE

export default router;
