const urlModel = require("../../models/url")
const { v4: uuidv4 } = require('uuid');
const quizModel = require("../../models/quizSchema")

const  dynamicUrlGenerator=async(req, res)=>{


    try {
        const uniqueId = uuidv4();
        const {quizId}=req.body;
       
        if(!quizId){
            return res.status(404).json({message:"Error in accessing QuizId", error:"",data:""})
        }
        const newUrl=new urlModel({
         urlId: uniqueId,
         quizdata :quizId
        })
        const response=  await newUrl.save()
        if(!response){
         return res.status(500).json({message:"Error in Generating URL",  error:error,data:""})
        }
        const updateUrlIdInQuiz=await quizModel.updateOne({_id:quizId},{urlId:uniqueId})
        
         const url = `https://online-quiz-generator.vercel.app/api/quiz/${uniqueId}/quizlive`;
         return res.status(200).json({ message:"Successfully Generated quiz URL", error:"",data:url});
    } catch (error) {
        
        return res.status(500).json({message:"Error in Generating URL", error:error,data:""})
    }
   

}

module.exports={dynamicUrlGenerator}




