

const questionModel = require("../../models/questionsSchema");
const optionModel = require("../../models/optionSchema");
const quizModel = require("../../models/quizSchema") 

const EditQuiz = async (req, res) => {
  try {
    const { editDataArray } = req.body;
    const token =  req.cookies;
    // console.log(token)

    for (const questionData of editDataArray) {
   
      await questionModel.updateOne(
        { _id: questionData._id },
        { question: questionData.question, timer: questionData.timer }
      );

    
      for (const option of questionData.options) {
        await optionModel.updateOne(
          { _id: option._id },
          { text: option.optionText, img: option.optionImg }
        );
      }
    }

    res.status(200).json({ message: "Quiz edited successfully", data:editDataArray });
  } catch (error) {
    // console.error("Error editing quiz:", error);
    return res.status(500).json({ message: "Error in editing", error:error ,data:"" });
  }
};





const quizDelete = async (req, res) => {
  try {
    const { quizId } = req.body;

    if (!quizId) {
      return res.status(400).json({message:"Select Quiz" ,error: "Quiz ID is required" , data:""});
    }

    const quizData = await quizModel.findOne({ _id: quizId }).populate({
      path: 'questions',
      populate: { path: 'options' }
    });

    if (!quizData) {
      return res.status(404).json({message:"Quiz Not Found" ,error: "Quiz Not Found" , data:""});
    }

    for (const question of quizData.questions) {
      await optionModel.deleteMany({ _id: { $in: question.options.map(option => option._id) } });
      await questionModel.deleteOne({ _id: question._id });
    }


    const deleteResult = await quizModel.deleteOne({ _id: quizId });

    return res.status(200).json({ success: true,message:"Successfully deleted", deletedQuiz: deleteResult, data: quizData });
  } catch (error) {
    // console.error("Error deleting quiz:", error);
    return res.status(500).json({message:"Server Error" ,error: "Internal Server Error" , data:""});
  }
}









module.exports = { EditQuiz , quizDelete};







// {
//     "editDataArray":[{ 
//     "correctAnswered": 2,
//     "options": [
//       {
//         "optionImg": "1212121212121212121212121212121212",
//         "optionText": "Have you ever been to this situation",
//         "optionType": "text",
//         "pollSelectedCount": 0,
//         "qnaSelected": true,
//         "_id": "66cc9f7f60e230d99a442cf1"
//       },
//       {
//         "optionImg": "",
//         "optionText": "1212121212121212121212121212121212",
//         "optionType": "text",
//         "pollSelectedCount": 0,
//         "qnaSelected": false,
//         "_id": "66cc9f7f60e230d99a442cf2"
//       },
//       {
//         "optionImg": "",
//         "optionText": "1212121212121212121212121212121212",
//         "optionType": "text",
//         "pollSelectedCount": 0,
//         "qnaSelected": false,
//         "_id": "66cc9f7f60e230d99a442cf3"
//       },
//       {
//         "optionImg": "1212121212121212121212121212121212",
//         "optionText": "",
//         "optionType": "text",
//         "pollSelectedCount": 0,
//         "qnaSelected": false,
//         "_id": "66cc9f7f60e230d99a442cf4"
//       }
//     ],
//     "question": "1212121212121212121212121212121212",
//     "totalAttempt": 2,
//     "timer":"25 Sec",
//     "_id": "66cca54a2e207913c939e7cc"}]
   
//   }
  