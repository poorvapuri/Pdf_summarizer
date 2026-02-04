const runSummarizer = require("../services/pythonService");
const Summary = require("../models/Summary");

exports.uploadAndSummarize = async (req, res) => {
  const result = await runSummarizer(req.file.path);

  const record = await Summary.create({
    userId: req.userId,
    fileName: req.file.originalname,
    summary: result.summary
  });

  res.json(record);
};
