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
  // console.log('verify Token')
  try {
    // console.log("req.headers.cookie ", req.headers.cookie)
    if (!req.headers.cookie) {
      // console.log("ekwndjmnc ")
      return res.status(404).json({ message: "No token found" });
    }
    const cookies = req.headers.cookie.split(";")[0];
    const token = cookies.split("=")[1];

    if (!token) {
      res.status(401).json({ message: "No token found" });
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
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
 
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

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          // If email exists, send a 409 Conflict response
          return res.status(409).json({ error: "Email already exists" });
        }  
    // Create a new user if the email doesn't exist
    const user = new User({ name, password, email, role });
    await user.save();

    res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const userLogout=async(req,res)=>{

  res.clearCookie('token')
  res.json({ message: 'Logout successful' });

}

exports.login = login;
exports.register = register;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.userLogout=userLogout;
// exports.authMiddleware=authMiddleware;
