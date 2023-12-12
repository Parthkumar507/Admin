const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');



const {
   login,
   register,
   verifyToken,
   getUser,
  //  authMiddleware
  userLogout,
  } = require("../controllers/user_controller");

const {
    addPermission,
    fetchPermission,
    getRoles,
}=require('../controllers/api_controller')

console.log('router loaded');

// router.post('/login',authMiddleware,login);
router.post('/login',login);
router.post('/register',register);

router.get('/welcome',verifyToken,getUser)

router.post('/logout',verifyToken,userLogout);

// ROUTE 1: Add a new Note using: POST "/api/permission/addpermission". Login required
router.post('/api/addpermission', verifyToken,addPermission);

// ROUTE 2: Add a new Note using: GET "/api/permission/fetchpermission". Login required
router.get('/api/fetchpermission/',verifyToken, fetchPermission);

// ROUTE 3: Add a new Note using: GET "/api/getRole". Login required
router.get('/api/getRole',verifyToken,getRoles );





module.exports=router

  