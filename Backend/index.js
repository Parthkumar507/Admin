const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// const connectDB = require("./model/ConnectMongoDB");
// const connectDBcloud = require("./model/ConnectMongoCloud.js");
const User = require("./model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser=require('cookie-parser')
const user_routes=require('./router/user_routes.js')


/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend's URL
  credentials: true,
}));
app.use(cookieParser())

//Middleware for parsing Json
app.use(express.json());



// MONGOOSE SETUP
const PORT = process.env.PORT || 8000;

//Local Storage MongoDB Method
// connectDB();

const connectionString = process.env.MONGO_URL;
// const connectionString = `mongodb+srv://Parth:${passWord}@cluster0.gzcbjqa.mongodb.net/?retryWrites=true&w=majority`
// Connect to MongoDB
mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// use express router
app.use("/", user_routes);

app.listen(PORT, () => {
  console.log(`Server Port: ${PORT}`);
});

