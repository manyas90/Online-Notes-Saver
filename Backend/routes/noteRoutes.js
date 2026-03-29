import express from "express";
import mongoose from "mongoose";
import Paste from "../models/Paste.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* 🗑 DELETE PASTE */
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  // validate id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid paste ID" });
  }

  try {
    const userId = req.user.id || req.user.userId;

    const deletedPaste = await Paste.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!deletedPaste) {
      return res
        .status(404)
        .json({ message: "Paste not found or not authorized" });
    }

    res.status(200).json({ message: "Paste deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
