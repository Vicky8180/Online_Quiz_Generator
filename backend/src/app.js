// const express = require('express')
// const app = express();
// const db=require("./config/db")
// const dotenv= require('dotenv')
// dotenv.config()
// const cookieParser = require('cookie-parser');

// const cors = require('cors');

// app.use(cors({
//   origin: 'http://localhost:3000', 
//   credentials: true, 
// }));


// const PORT = process.env.PORT || 5000;
// db();

// // Middleware to parse JSON
// app.use(express.json());
// app.use(cookieParser());
// // Routes
// app.use('/api/auth', require("./routes/authRoute"));

// app.use('/api/quiz', require('./routes/quizRoute'));


// app.listen(PORT, ()=>{
//     console.log(`Server is runnning on port no ${PORT}`)
// })


const express = require('express');
const app = express();
const db = require("./config/db");
const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');
const cors = require('cors');

const allowedOrigins = ['http://localhost:3000','https://online-quiz-generator.vercel.app', 'http://another-origin.com'];
// app.use(cors())
dotenv.config();
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

const PORT = process.env.PORT || 5000;
db();


app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', require("./routes/authRoute"));
app.use('/api/quiz', require('./routes/quizRoute'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
