const mongoose=require('mongoose');
const password = "osmania12345";
const url =
`mongodb+srv://connectAdmin:${password}@cluster0.zw693le.mongodb.net/?retryWrites=true&w=majority`;

module.exports.connect=()=>{
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log("connected to mongodb")
    })
    .catch((err)=>{
        console.log("Error"+err)
    })
}
