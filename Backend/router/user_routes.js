const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');



const {
   login,
   register,
   verifyToken,
   getUser,
  //  authMiddleware
  } = require("../controllers/user_controller");

const {
    addPermission,
    fetchPermission
}=require('../controllers/api_controller')

console.log('router loaded');

// router.post('/login',authMiddleware,login);
router.post('/login',login);
router.post('/register',register);

router.get('/welcome',verifyToken,getUser)

// ROUTE 1: Add a new Note using: POST "/api/permission/addpermission". Login required
router.post('/api/addpermission', verifyToken,addPermission);

// ROUTE 2: Add a new Note using: GET "/api/permission/fetchpermission". Login required
router.get('/api/fetchpermission/:userId',verifyToken, fetchPermission);


module.exports=router

  