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



const runSummarizer = require("../services/pythonService");
const Summary = require("../models/Summary");

exports.uploadAndSummarize = async (req, res) => {
  console.log("📄 req.file =", req.file);
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF uploaded" });
    }

    const result = await runSummarizer(req.file.path, "text");

    const record = await Summary.create({
      userId: req.userId,
      fileName: req.file.originalname,
      summary: result.summary
    });

    res.json(record);
  } catch (err) {
    console.error("Summarization error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};
