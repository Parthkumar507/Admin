const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB=require('./model/permission.js')
const User=require('./model/user.js')


/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Middleware for parsing Json
app.use(express.json());



//Registration
app.post('/register',async(req,res) => {
  try{
      const {name,password,email,role} = req.body;
      console.log('```````````````````````````')
      console.log(req.body)
      const user = new User({name,password,email,role});
      await user.save();
      res.status(201).json({message:'Registration Successful'});
  }
  catch(error){
      res.status(500).json({error:'Registration failed'});
  }
})

//Login
app.post('/login',async(req,res)=>{
  try{
      const{email,password}=req.body;
      const UserinDB = await User.findOne({email});

      if(!UserinDB){
        return res.status(401).json({error:"Incorrect email Id or Password"});
      }
      if(UserinDB.password !== password){
        return res.status(401).json({error:'Invalid username or password'});
    }
    res.status(200).json({ message: 'Login successful' })
  }
  catch(error){
    return res.status(500).json({error:"Login failed"});
  }
})


// MONGOOSE SETUP
const PORT = process.env.PORT || 8000;
connectDB();

// use express router
app.use('/',require('./router/index.js'))


  app.listen(PORT, () => {
    console.log(`Server Port: ${PORT}`)
});
