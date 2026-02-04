const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  fileName: String,
  summary: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Summary", summarySchema);
