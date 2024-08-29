const userModel = require("../../models/userSchema");
const moment = require("moment");

const quizAnalysis = async (req, res) => {
  try {
    const { userId } = req.body;

    const data = await userModel
      .findById(userId)
      .populate({
        path: "quizs",
        populate: { path: "questions", populate: { path: "options" } },
      });

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    const MainData = {
      userId: data._id,
      impression: 0,
      quizCount: data.quizs.length,
      questionCount: 0,
      quizArray: [],
    };

    for (let quiz of data.quizs) {
      MainData.impression += quiz.impression;
      let quizQuestionsArray = [];

      for (let question of quiz.questions) {
        let questionData = {
          question: question.question,
          _id: question._id,
          timer: question.timer,
          options: question.options.map((option) => ({
            optionText: option.text,
            optionImg: option.img,
            optionType: option.optionType,
            pollSelectedCount: option.pollSelectedCount,
            qnaSelected: option.qnaSelected,
            _id: option._id,
          })),
        };

        if (quiz.quizType === "QnA") {
          questionData.correctAnswered = question.qnaCorrectCounter;
          questionData.totalAttempt = question.attemptCount;
        } else if (quiz.quizType === "poll") {
          questionData.optionCounts = question.options.map((option) => ({
            optionText: option.text,
            pollSelectedCount: option.pollSelectedCount,
          }));
        }

        quizQuestionsArray.push(questionData);
      }

      MainData.quizArray.push({
        quizName: quiz.quizName,
        _id: quiz._id,
        quizType: quiz.quizType,
        quizQuestionsArray: quizQuestionsArray,
        impression: quiz.impression,
        urlId: quiz.urlId,
        createdAt: moment(quiz.createdAt).format("DD MMM, YYYY"),
      });

      MainData.questionCount += quiz.questions.length;
    }

    return res
      .status(200)
      .json({ message: "Successfully fetch", data: MainData, error: "" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in Analyzing", error: error, data: "" });
  }
};

module.exports = { quizAnalysis };

