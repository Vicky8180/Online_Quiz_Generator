const express = require("express");
const { Register, Login } = require("../controllers/userController");
const { AddQuestion } = require("../controllers/quizController");
// const {dynamicUrlGenerator} = require("../controllers/dynamicUrl/dynamicUrlGenerator")
// const {quizURL}  = require('../controllers/dynamicUrl/quizURL')
const Auth = require("../middlewares/Authentication/Authenticate");
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/add", Auth, AddQuestion);
// router.post('/urlgenerate', dynamicUrlGenerator)
// router.get("/url/:id/quizlive",  quizURL )

module.exports = router;
