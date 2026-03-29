import mongoose from "mongoose";

const PasteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
PasteSchema.index({ title: 1, user: 1 }, { unique: true });
const Paste = mongoose.model("Paste", PasteSchema);
export default Paste;
