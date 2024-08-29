const jwt = require('jsonwebtoken');

const dotenv= require("dotenv")
dotenv.config();


const generateToken = async (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY); 
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw error; 
  }
};

module.exports = generateToken;
