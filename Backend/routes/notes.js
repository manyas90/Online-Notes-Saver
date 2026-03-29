import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

router.post("/notes", async (req, res) => {
  const note = await Note.create(req.body);
  res.json(note);
});

router.get("/notes/:userId", async (req, res) => {
  const notes = await Note.find({ userId: req.params.userId });
  res.json(notes);
});

export default router;
