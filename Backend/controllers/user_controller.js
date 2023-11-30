const User = require("../model/user")
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

        const tokenNew=jwt.sign({_id:userInDB._id},process.env.secretOrPrivateKey,{
          expiresIn:"7d",
        })
        console.log("Generated Token");

        res.clearCookie(String(userInDB._id), { path: '/' });
      
        res.cookie(String(userInDB._id), tokenNew, {
          domain:'localhost',
          path: "/",
          expires: new Date(Date.now() + 1000 * 30000), // 30000 seconds
          httpOnly: true,
          sameSite: "lax",
        });

  
        return res.status(200).json({ user:tokenNew });
      } 
      else {
        console.log("Authentication failed");
        return res.status(401).json({ error: "Incorrect email or password" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  

}

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




exports.login=login;
exports.register=register



