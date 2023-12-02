const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    try {

          

    const { email, password } = req.body;
    const userInDB = await User.findOne({ email });

    if (!userInDB) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }
    const passwordCheck = await bcrypt.compare(password, userInDB.password);

    if (!passwordCheck) {
      console.log("Authentication failed");
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    console.log("Authentication successful");
    res.clearCookie('token')

    const tokenNew = jwt.sign(
      { _id: userInDB._id},
      process.env.secretOrPrivateKey,
      {
        expiresIn: "1h",
      }
    );
    console.log("Generated Token\n");
    // console.log("Generated Token\n", tokenNew);


   
    res.cookie("token", tokenNew, {
      domain: "localhost",
      path: "/",
      expires: new Date(Date.now() + 1000 * 30000), // 30000 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    // return res.status(200).json({ user: userInDB,tokenNew });
    return res.status(200).json({ tokenNew });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const verifyToken = async (req, res, next) => {
  try {
    const cookies=req.headers.cookie.split(";")[0];
    // const cookies=req.headers.cookie;
    // console.log('```````cookies```````````')
    // console.log(cookies)
    const token=cookies.split("=")[1];
    // console.log('`````````token`````````')
    // console.log(token)    
    if (!token) {
      res.status(404).json({ message: "No token found" });
    }

    jwt.verify(String(token), process.env.secretOrPrivateKey, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" });
        }
        console.log(err)
        return res.status(400).json({ message: "Invalid Token" });
      }
      console.log(user._id);
      req.id = user._id;
    });
  } catch (err) {
    res.status(401).send("Unauthorized ");
    console.log(err);
  }
  next();
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;

  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!user) {
    console.log("User not found");
    return res.status(404).json({ message: "User Not Found" });
  }

  // Only send the response once
  return res.status(200).json({ user });
};

//Registration
const register = async (req, res, next) => {
  try {
    const { name, password, email, role } = req.body;
    const user = new User({ name, password, email, role });
    await user.save();

    res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};


// const authMiddleware = (req, res, next) => {
//   // Check if a token is present in the cookies, headers, or however you handle tokens
//   const token = req.cookies.token || req.headers.authorization;
//   console.log(' token ',token)

//   // If the token is present, redirect or send an error response
//   if (token) {
//     return res.redirect('http://localhost:3000/welcome');
//     // or
//     // return res.status(403).json({ message: 'Forbidden' });
//   }

//   // If no token is present, continue to the next middleware/route
//   next();
// };

exports.login = login;
exports.register = register;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
// exports.authMiddleware=authMiddleware;
