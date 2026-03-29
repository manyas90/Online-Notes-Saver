import Paste from "../models/Paste.js";

// GET paste by ID (USED FOR VIEW + EDIT)
export const getPasteById = async (req, res) => {
  try {
    const paste = await Paste.findById(req.params.id);

    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    res.status(200).json(paste);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE paste
export const updatePaste = async (req, res) => {
  try {
    const updatedPaste = await Paste.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPaste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    res.status(200).json(updatedPaste);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all pastes
export const getAllPastes = async (req, res) => {
  try {
    const pastes = await Paste.find();
    res.status(200).json(pastes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
