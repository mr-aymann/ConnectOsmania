const mongoose=require('mongoose');
const dotenv = require('dotenv');


// Load environment variables from .env file
dotenv.config();

// Access the MongoDB password from the environment variable
const mongoPassword = process.env.MONGO_PASSWORD;

const url =
`mongodb+srv://connectAdmin:${mongoPassword}@cluster0.zw693le.mongodb.net/?retryWrites=true&w=majority`;

module.exports.connect=()=>{
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log("connected to mongodb")
    })
    .catch((err)=>{
        console.log("Error"+err)
    })
}
