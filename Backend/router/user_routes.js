const express = require("express");
const router = express.Router();

const {
   login,
   register,
   verifyToken,
   getUser
  } = require("../controllers/user_controller");

console.log('router loaded');

router.post('/login',login);
router.post('/register',register);

router.get('/',verifyToken,async (req,res)=>{
  console.log("Hellooooooo this is home page")
  try {
     await getUser(req, res);
    // res.json(rootUser);
  } catch (error) {
    // Handle any errors that occurred in getUser
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  // If getUser succeeded, you can continue with your logic here
  res.json({ message: "Home page data" });
})


module.exports=router;