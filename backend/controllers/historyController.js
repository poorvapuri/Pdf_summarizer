const Summary = require("../models/Summary");

exports.getHistory = async (req, res) => {
  const history = await Summary.find({ userId: req.userId });
  res.json(history);
};

exports.deleteHistory = async (req, res) => {
  await Summary.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
