import PDFDocument from "pdfkit";
import Paste from "../models/Paste.js";

export const generatePastePDF = async (req, res) => {
  try {
    const paste = await Paste.findById(req.params.id);

    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${paste.title}.pdf`
    );

    doc.pipe(res);

    // Title
    doc
      .fontSize(22)
      .text(paste.title, { align: "center" })
      .moveDown();

    // Content
    doc
      .fontSize(14)
      .text(paste.content, {
        align: "left",
      });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
