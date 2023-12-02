const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Permission = require('../model/Permission')


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

// ROUTE 1: Add a new Note using: POST "/api/permission/addpermission". Login required
router.post('/api/addpermission',  [
  body('role', 'Enter a valid role').isLength({ min: 3 }),
 
   ], async (req, res) => {
      try {
          const { role ,permission } = req.body;
          // If there are errors, return Bad request and the errors
          console.log(req.body)
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }
          const permissionData = new Permission({
              role ,permission
          })
          const savedNote = await permissionData.save()
          res.json(savedNote)
          console.log(savedNote)

      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })


module.exports=router;