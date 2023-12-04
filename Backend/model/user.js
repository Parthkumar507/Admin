const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

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
    },
    role:{
        type:String,
        require:true,
    },
    // permission: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
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


const User=mongoose.model('User',UserSchema);

module.exports=User;
