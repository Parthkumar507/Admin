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

    const tokenNew = jwt.sign(
      { _id: userInDB._id },
      process.env.secretOrPrivateKey,
      {
        expiresIn: "1h",
      }
    );
    console.log("Generated Token\n", tokenNew);

    // res.clearCookie(String(userInDB._id), { path: "/" });

    res.cookie(String(userInDB._id), tokenNew, {
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
    const token=cookies.split("=")[1];
    // console.log('``````````````````')
    // console.log(token)    
    if (!token) {
      res.status(404).json({ message: "No token found" });
    }
    jwt.verify(String(token), process.env.secretOrPrivateKey, (err, user) => {
      if (err) {
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
    return res.status(404).json({ message: "User Not FOund" });
  }
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

exports.login = login;
exports.register = register;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
