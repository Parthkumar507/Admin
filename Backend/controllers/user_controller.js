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
    res.clearCookie("token");

    const tokenNew = jwt.sign(
      { _id: userInDB._id },
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
    // console.log("req.headers.cookie ", req.headers.cookie)
    if (!req.headers.cookie) {
      // console.log("ekwndjmnc ")
      return res.status(404).json({ message: "No token found" });
    }
    const cookies = req.headers.cookie.split(";")[0];
    // const cookies=req.headers.cookie;
    // console.log('```````cookies```````````')
    // console.log(cookies)
    const token = cookies.split("=")[1];
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
        console.log(err);
        return res.status(400).json({ message: "Invalid Token" });
      }
      console.log(user._id);
      req.id = user._id;
    });
  } catch (err) {
    console.log(err);
    throw { status: 401, message: "Unauthorized" };
  }
  next();
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;

  try {
    user = await User.findById(userId, "-password");

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Registration
const register = async (req, res, next) => {
  try {
    const { name, password, email, role } = req.body;
    const user = new User({ name, password, email, role });
    await user.save();

    res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = login;
exports.register = register;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
// exports.authMiddleware=authMiddleware;
