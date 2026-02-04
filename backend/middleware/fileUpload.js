const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/pdfs",
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

module.exports = multer({
  storage,
  fileFilter: (_, file, cb) => {
    file.mimetype === "application/pdf"
      ? cb(null, true)
      : cb(new Error("Only PDFs allowed"));
  }
});
