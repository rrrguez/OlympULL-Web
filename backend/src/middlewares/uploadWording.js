import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "wordings/");
  },
  filename: (req, file, cb) => {
    const exerciseId = req.body.id;   // comes from form
    cb(null, `${exerciseId}.pdf`);
  }
});

export const uploadWording = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF allowed"));
    }
    cb(null, true);
  }
});
