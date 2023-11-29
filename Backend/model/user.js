const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


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
        require:true,
    },
    tokens:[
      {
        token:{
          type:String,
          require:true,
        }
      }
    ]
});

UserSchema.pre('save', function (next) {
  const user = this;

  // Only hash the password if it has been modified or is new
  if (!user.isModified('password')) return next();

  // Generate a salt
  bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);

      // Hash the password along with the new salt
      bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) return next(err);

          // Override the plaintext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

//Function to generate the JWT token
UserSchema.methods.getAuthenticateToken=async function(){
  try{
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    let tokenNew=jwt.sign({_id:this._id},process.env.secretOrPrivateKey)
    this.tokens=this.tokens.concat({token:tokenNew});
    await this.save();
    return tokenNew;
  }
  catch(err){
    console.log("Here is a Error ",err);
  }
}


const User=mongoose.model('User',UserSchema);

module.exports=User;
