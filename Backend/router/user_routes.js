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

router.get('/home',verifyToken,getUser)


module.exports=router;