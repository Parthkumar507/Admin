const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  // res.cookie("test","1 okayyyyy",{
  //   expires:new Date(Date.now()+2500000000),
  //   })
  try {
    const { email, password } = req.body;
    const userInDB = await User.findOne({ email });

    if (!userInDB) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }
    const passwordCheck = await bcrypt.compare(password, userInDB.password);

    if (passwordCheck) {
      console.log("Authentication successful");
      // const token=await userInDB.getAuthenticateToken();
      // console.log(token);

      const tokenNew = jwt.sign(
        { _id: userInDB._id },
        process.env.secretOrPrivateKey,
        {
          expiresIn: "7d",
        }
      );
      console.log("Generated Token");

      res.clearCookie(String(userInDB._id), { path: "/" });

      res.cookie(String(userInDB._id), tokenNew, {
        domain: "localhost",
        path: "/",
        expires: new Date(Date.now() + 1000 * 30000), // 30000 seconds
        httpOnly: true,
        sameSite: "lax",
      });

      return res.status(200).json({ user: tokenNew });
    } else {
      console.log("Authentication failed");
      return res.status(401).json({ error: "Incorrect email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Registration
const register = async (req, res, next) => {
  try {
    const { name, password, email, role } = req.body;
    // console.log('```````````````````````````')
    // console.log(req.body)
    const user = new User({ name, password, email, role });
    await user.save();
    res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    if (!token) {
      res.status(404).json({ message: "No token found" });
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid TOken" });
      }
      console.log(user.id);
      req.id = user.id;
      
      

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
  if (!user) {
    return res.status(404).json({ message: "User Not FOund" });
  }
  return res.status(200).json({ user });
 
   } 
   catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
   }
};

exports.login = login;
exports.register = register;
exports.verifyToken=verifyToken;
exports.getUser=getUser;
