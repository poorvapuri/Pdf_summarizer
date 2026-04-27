// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/authMiddleware");
// const upload = require("../middleware/fileUpload");
// const { uploadAndSummarize } = require("../controllers/pdfController");

// router.post("/upload", auth, upload.single("pdf"), uploadAndSummarize);

// module.exports = router;


const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");
const pdfController = require("../controllers/pdfController");

router.post(
  "/upload",
  (req, res, next) => {
    console.log("✅ ROUTE HIT");
    next();
  },
  auth,
  upload.single("pdf"),
  pdfController.uploadAndSummarize   // ✅ THIS is the function
);

router.put("/summary/:id/heading", auth, pdfController.selectHeading);

module.exports = router;
