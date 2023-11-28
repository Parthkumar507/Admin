const mongoose=require('mongoose')
// Define the email validation function
function validateEmail(email) {
    // Your email validation logic here
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  

const UserSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
          validator: validateEmail,
          message: 'Please fill a valid email address',
        },
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please fill a valid email address',
        ],
    },
    role:{
        type:String,
        rquire:true,
    }
});

const User=mongoose.model('User',UserSchema);

module.exports=User;