const mongoose = require('mongoose')


const questionSchema= new mongoose.Schema({

   question:{type:String, required:true},
   correctOption:{type:Number, default:null},
   selectedOption:{type:Number, default:null},
   options:[{ type: mongoose.Schema.Types.ObjectId, ref: 'option' }],
   attemptCount:{type:Number, default:0},
   timer:{type:String, default:null},
   qnaCorrectCounter:{type:Number, deafult:0},


},{timestamps:true})


const questionsModel= new mongoose.model('question', questionSchema)

module.exports=questionsModel