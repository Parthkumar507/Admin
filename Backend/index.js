const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./model/permission.js");
const User = require("./model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

//Middleware for parsing Json
app.use(express.json());



// MONGOOSE SETUP
const PORT = process.env.PORT || 8000;
connectDB();

// use express router
app.use("/", user_routes);

app.listen(PORT, () => {
  console.log(`Server Port: ${PORT}`);
});


// //Registration
// app.post("/register", async (req, res) => {
//   try {
//     const { name, password, email, role } = req.body;
//     // console.log('```````````````````````````')
//     // console.log(req.body)
//     const user = new User({ name, password, email, role });
//     await user.save();
//     res.status(201).json({ message: "Registration Successful" });
//   } catch (error) {
//     res.status(500).json({ error: "Registration failed" });
//   }
// });






// `````used controller```

// app.post("/login", async (req, res) => {
//   res.cookie("test","1 okayyyyy",{
//     expires:new Date(Date.now()+2500000000),
//     })
//   try {
//     const { email, password } = req.body;
//     const userInDB = await User.findOne({ email });

//     if (!userInDB) {
//       return res.status(401).json({ error: "Incorrect email or password" });
//     }
//     const passwordCheck = await bcrypt.compare(password, userInDB.password);

//     if (passwordCheck) {
//       console.log("Authentication successful");
//       const token=await userInDB.getAuthenticateToken();
//       // console.log(token);

//       res.cookie("tokenCookie",token,{
//         expires:new Date(Date.now()+2500000000),
//         httpOnly:true,
//         // path:"http://localhost:3000/"
//       })  

//       return res.status(200).json({ message: "Login successful" });
//     } else {
//       console.log("Authentication failed");
//       return res.status(401).json({ error: "Incorrect email or password" });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({ error: "Login failed" });
//   }
// });
