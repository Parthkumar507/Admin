const mongoose=require('mongoose');
const connectDB=async()=>
{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/registerUserDB')
        console.log('Connected to MongoDB');
    }
    catch(error){
        console.log(`MongoDb did not connect , error: ${error}`)
    } 
}

module.exports =connectDB;