const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    quizName: { type: String, required: true },
    quizType: { type: String, required: true },
    questions:[{ type: mongoose.Schema.Types.ObjectId, ref:'question'}],
    impression:{type:Number, default:0},
    urlId:{type:String, default:null}
  },
  { timestamps: true }
);

const quizSchemaModel = new mongoose.model("quiz", quizSchema);

module.exports = quizSchemaModel;
