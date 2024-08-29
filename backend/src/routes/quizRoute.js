const express = require("express");
const {
  dynamicUrlGenerator,
} = require("../controllers/dynamicUrl/dynamicUrlGenerator");
const {
  quizURL,
  updateEachQuestion,
} = require("../controllers/dynamicUrl/quizURL");
const { quizAnalysis } = require("../controllers/quizAnalysis/quizAnalysis");
const {
  EditQuiz,
  quizDelete,
} = require("../controllers/quizAnalysis/editQuiz");
const Auth = require("../middlewares/Authentication/Authenticate");
const router = express.Router();

// router.post('/add', AddQuestion)
router.post("/url/generate", dynamicUrlGenerator);
router.get("/:id/quizlive", quizURL);
router.post("/eachquestion", updateEachQuestion);
router.post("/quizanalysis", Auth, quizAnalysis);
router.patch("/edit", Auth, EditQuiz);
router.delete("/delete", Auth, quizDelete);

module.exports = router;
