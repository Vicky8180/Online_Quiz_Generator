const mongoose = require('mongoose')
const optionSchema=new mongoose.Schema({

     optionType:{type:String, default:null},
     text:{type:String,  default:null},
     img:{type:String,  default:null},
     pollSelectedCount:{type:Number, default:0},
     qnaSelected:{type:Boolean, default:false}
},{timestamps:true})

const optionModel= new mongoose.model('option', optionSchema)

module.exports=optionModel;