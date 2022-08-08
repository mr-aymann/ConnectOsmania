const { default: mongoose } = require('mongoose');
const moongoose=require('mongoose');

const QuestionSchema=new moongoose.Schema({
    questionName:String,
    questionUrl:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    answers:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Answer'
    }
})

module.exports=moongoose.model('Question',QuestionSchema)