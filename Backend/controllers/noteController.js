import Note from "../models/Note.js";
import mongoose from "mongoose";

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // safety check
   /* if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note id" });
    }
*/
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
