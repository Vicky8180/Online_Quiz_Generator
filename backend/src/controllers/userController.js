const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");
const genrateToken = require("../middlewares/Authentication/SignAuth");
const setCookies = require("../middlewares/Authentication/setCookies");

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
const Register = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    console.log(name);
    const userExist = await userModel.find({ email });
    // console.log(userExist);
    if (userExist.length > 0) {
      return res
        .status(409)
        .json({ message: "User Already Exist", error: "", data: "" });
    }
    // console.log(password);

    if (password != confirm_password) {
      return res
        .status(401)
        .json({ message: "Password not matched", error: "", data: "" });
    }
    // console.log(confirm_password);
    const user = new userModel({ name, email, password, confirm_password });
    await user.save();

    return res
      .status(200)
      .json({ message: "Registerd Successfully", error: "", data: user });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error in registering user", error: error, data: "" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res
        .status(404)
        .json({ message: "User Not Exist", error: "", data: "" });
    }

    const isMatch = await userExist.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", error: "", data: "" });
    }

    // console.log("1")
    const payload = { userId: userExist._id.toString() };
    // console.log("2")
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "8h",
    });

    // res.cookie('token', token,{
    //   httpOnly: false,
    //   secure: false, // Ensure this works with your environment
    //   expires: new Date(Date.now() + 36000000), // Cookie expires in 1 hour
    //   sameSite: 'None', // For cross-origin cookies
    //   path: '/', // Set cookie for the entire domain
    // } );

    // console.log("4")

    // console.log('Response Cookies:', res.getHeaders()['set-cookie']);

    // setTimeout(()=>{
    return res
      .status(200)
      .json({
        message: "Successful Login",
        error: "",
        data: userExist,
        token: token,
      });
    // },2000)
  } catch (error) {
    return res
      .status(400)
      .json({
        message: "Something went wrong",
        error: error.message,
        data: "",
      });
  }
};

module.exports = { Register, Login };
