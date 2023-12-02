const express = require("express");
const router = express.Router();

const {
   login,
   register,
   verifyToken,
   getUser,
  //  authMiddleware
  } = require("../controllers/user_controller");

console.log('router loaded');

// router.post('/login',authMiddleware,login);
router.post('/login',login);
router.post('/register',register);

router.get('/welcome',verifyToken,getUser)


module.exports=router;