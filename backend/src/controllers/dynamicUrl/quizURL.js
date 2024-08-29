const urlModel = require("../../models/url");
const quizModel = require("../../models/quizSchema");
const questionsModel = require("../../models/questionsSchema");
const optionModel = require("../../models/optionSchema");

const quizURL = async (req, res) => {
  // console.log(req.params.id);
  try {
    const urlId = req.params.id;
    const data = await urlModel.find({ urlId: urlId });
    //   console.log(data[0].quizdata)

    const quizExist = await urlModel
      .findOne({ urlId: urlId })
      .populate({
        path: "quizdata",
        populate: { path: "questions", populate: { path: "options" } },
      });
    // console.log(quizExist)
    const updateImpression = await quizModel.updateOne(
      { _id: data[0].quizdata },
      { $inc: { impression: 1 } }
    );
    if (!quizExist) {
      return res
        .status(404)
        .json({ message: "Not Exist", error: "", data: "" });
    }

    return res
      .status(200)
      .json({ message: "Successfully", error: "", data: quizExist });
  } catch (error) {
    return res.status(500).json({ message: "Server eroor", error: error.message, data:"" })
    // console.log(error);
  }
};

const updateEachQuestion = async (req, res) => {
  const { quizType, quizId, questionId, selectedOption } = req.body;

  try {
    const data = await quizModel
      .findOne({ _id: quizId })
      .populate({
        path: "questions",
        match: { _id: questionId },
        populate: { path: "options" },
      });
    // const updateImpression= await  quizModel.update({_id:quizId}, {$inc:{impression:1}})
    await questionsModel.updateOne(
      { _id: questionId },
      { $inc: { attemptCount: 1 } }
    );
    let correctOption2 = (await questionsModel.findOne({ _id: questionId }))
      .correctOption;

    if (data.quizType == "Poll") {
      data.questions[0].options.map(async (item, idx) => {
        if (idx == selectedOption) {
          await optionModel.updateOne(
            { _id: item._id },
            { $inc: { pollSelectedCount: 1 } }
          );
        }
      });
    } else {
      if (
        selectedOption == correctOption2 &&
        selectedOption != null &&
        correctOption2 != null
      ) {
        await questionsModel.updateOne(
          { _id: questionId },
          { $inc: { qnaCorrectCounter: 1 } }
        );
      }
    }

    return res.status(200).json({ message: "Successfully updated" ,error:"", data:"" });
  } catch (error) {
    return res.status(500).json({ message: "Error in Updation" ,error:error, data:"" });
  }
  //    attemptcounter increase counter by one every tiime
  //  if correctOption is not null then match the selectedOption and correctOption if equal-> increase the selected pollcounter
  //  if correctOption is null then match the selectedOption and correctOption if equal -> increase the qnaCorrectCounter in question
};

module.exports = { quizURL, updateEachQuestion };
