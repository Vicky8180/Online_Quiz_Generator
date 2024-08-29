const userModel = require("../models/userSchema");
const questionsModel = require("../models/questionsSchema");
const quizModel = require("../models/quizSchema");
const optionModel = require("../models/optionSchema");

const createOption = async (optionData) => {
  const newOption = new optionModel({
    optionType: optionData.type,
    text: optionData.text,
    img: optionData.img,
    // pollSelectedCount,
    qnaSelected: optionData.radio,
  });
  const savedOption = await newOption.save();
  return savedOption._id;
};

const validateRequest = (body) => {
  const { final, quizName, quizType, email } = body;

  if (!final || !quizName || !email) {
    throw new Error("Missing required fields");
  }
};

const createQuestion = async (questionData) => {
  const optionIds = await Promise.all(questionData.options.map(createOption));

  const newQuestion = new questionsModel({
    question: questionData.questionSingle,
    correctOption: questionData.selectedOption,
    // selectedOption,
    options: optionIds,
    // attempted,
    timer: questionData.inputTimer,
  });

  const savedQuestion = await newQuestion.save();
  return savedQuestion._id;
};

const createQuiz = async (quizName, quizType, questionIds) => {
  const newQuiz = new quizModel({
    quizName: quizName,
    quizType: quizType ? "QnA" : "Poll",
    questions: questionIds,
    // impression,
  });

  const savedQuiz = await newQuiz.save();
  return savedQuiz;
};

const updateUserWithQuiz = async (email, quizId) => {
  const updatedUser = await userModel.findOneAndUpdate(
    { email },
    { $push: { quizs: quizId } },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

const AddQuestion = async (req, res) => {
  // console.log(req.body)
  try {
    validateRequest(req.body);

    const { final, quizName, quizType, email } = req.body;
    let questionIds = [];

    for (const question of final) {
      const questionId = await createQuestion(question);
      questionIds.push(questionId);
    }

    const savedQuiz = await createQuiz(quizName, quizType, questionIds);
    await updateUserWithQuiz(email, savedQuiz._id);

    return res
      .status(200)
      .json({ message: "Quiz added successfully", savedQuiz });
  } catch (error) {
    // console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error" , error:error});
  }
};

module.exports = { AddQuestion };

// data

// {"final":
//     [
//       {"option": [

//           {
//             "text": "1",
//             "img": "",
//             "radio": false,
//             "type": "text"
//           },
//           {
//             "text": "2",
//             "img": "",
//             "radio": false
//           },
//           {
//             "text": "3",
//             "img": "",
//             "radio": false
//           },
//           {
//             "text": "4",
//             "img": "",
//             "radio": false
//           }

//     ],
//     "inputTimer": 10,
//     "quizType": "QnA",
//       "quizName":"quiz2",
//     "questionSingle": "Question will come here? What is the biggest among these numbers?",
//     "OptionType": "texttype",
//     "correctAnswer":"second opton",
//     "selectedOption1":"first",
//     "attempted":true
//       },

//     {"option": [

//           {
//             "text": "1",
//             "img": "",
//             "radio": false,
//             "type": "text"
//           },
//           {
//             "text": "2",
//             "img": "",
//             "radio": false
//           },
//           {
//             "text": "3",
//             "img": "",
//             "radio": false
//           },
//           {
//             "text": "4",
//             "img": "",
//             "radio": false
//           }

//     ],
//     "inputTimer": 10,
//     "quizName":"quiz1",
//     "quizType": "Poll type",
//     "questionSingle": "Question will come here? What is the biggest among these numbers?",
//     "OptionType": "texttype",
//         "correctAnswer":"first opton",
//         "selectedOption1":"second",
//         "attempted":false
//     }
//       ],
//         "quizName":"quiz1",
//     "quizType": "Poll type",
//     "email":"anoop@gmail.com"
//   }
