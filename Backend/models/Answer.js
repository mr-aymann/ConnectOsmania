const { default: mongoose } = require('mongoose');
const moongoose=require('mongoose');

const AnswerSchema=new moongoose.Schema({
    answer:String,
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'question'
    },
    questionUrl:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=moongoose.model('Answer',AnswerSchema)