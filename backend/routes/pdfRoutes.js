const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/fileUpload");
const { uploadAndSummarize } = require("../controllers/pdfController");

router.post("/upload", auth, upload.single("pdf"), uploadAndSummarize);

module.exports = router;
