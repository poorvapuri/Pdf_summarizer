// // // const runSummarizer = require("../services/pythonService");
// // // const Summary = require("../models/Summary");

// // // exports.uploadAndSummarize = async (req, res) => {
// // //   const result = await runSummarizer(req.file.path);

// // //   const record = await Summary.create({
// // //     userId: req.userId,
// // //     fileName: req.file.originalname,
// // //     summary: result.summary
// // //   });

// // //   res.json(record);
// // // };


// // const runSummarizer = require("../services/pythonService");
// // const Summary = require("../models/Summary");

// // exports.uploadAndSummarize = async (req, res) => {
// //   const result = await runSummarizer(req.file.path, "text");

// //   const record = await Summary.create({
// //     userId: req.userId,
// //     fileName: req.file.originalname,
// //     summary: result.summary
// //   });

// //   res.json(record);
// // };

// const runSummarizer = require("../services/pythonService");
// const Summary = require("../models/Summary");

// exports.uploadAndSummarize = async (req, res) => {
//   try {
//     const result = await runSummarizer(req.file.path, "text");

//     const record = await Summary.create({
//       userId: req.userId,
//       fileName: req.file.originalname,
//       summary: result.summary
//     });

//     res.json(record);
//   } catch (err) {
//     console.error("Summarization error:", err);
//     res.status(500).json({ message: "PDF summarization failed" });
//   }
// };



// const runSummarizer = require("../services/pythonService");
// const Summary = require("../models/Summary");

// exports.uploadAndSummarize = async (req, res) => {
//   console.log("📄 req.file =", req.file);
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No PDF uploaded" });
//     }

//     // const result = await runSummarizer(req.file.path, "text");

//     const summaryType = req.body.summaryType || "medium";
// const result = await runSummarizer(req.file.path, summaryType);


//     const record = await Summary.create({
//       userId: req.userId,
//       fileName: req.file.originalname,
//       summary: result.summary
//     });

//     res.json(record);
//   } catch (err) {
//     console.error("Summarization error:", err);
//     res.status(500).json({ message: "Upload failed" });
//   }
// };


const runSummarizer = require("../services/pythonService");
const Summary = require("../models/Summary");

exports.uploadAndSummarize = async (req, res) => {
  console.log("📄 req.file =", req.file);

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF uploaded" });
    }

    // 🔹 Read inputs
    const summaryType = req.body.summaryType || "medium";

    const startPage = req.body.startPage
      ? parseInt(req.body.startPage, 10)
      : null;

    const endPage = req.body.endPage
      ? parseInt(req.body.endPage, 10)
      : null;

    console.log("📘 SUMMARY TYPE:", summaryType);
    console.log("📄 PAGE RANGE:", startPage, endPage);

    // 🔹 Call Python summarizer
    const result = await runSummarizer(
      req.file.path,
      summaryType,
      startPage,
      endPage
    );

    // 🔹 Save summary
    const record = await Summary.create({
      userId: req.userId,
      fileName: req.file.originalname,
      summary: result.summary
    });

    res.json(record);
  } catch (err) {
    console.error("❌ Summarization error:", err);
    res.status(500).json({
      message: err.message || "Upload failed"
    });
  }
};
