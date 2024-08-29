const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    urlId: { type: String, required: true },
    quizdata:{type:mongoose.Schema.Types.ObjectId, ref:'quiz'}

  },
  { timestamps: true }
);

const urlModel = new mongoose.model("url", urlSchema);

module.exports = urlModel;
