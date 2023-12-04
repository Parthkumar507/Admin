// api_controller.js
const Permission = require('../model/Permission');
const User=require('../model/user')
const { body, validationResult } = require('express-validator');



const addPermission = async (req, res) => {
    try {
      const { role, permission } = req.body;
  
      // Validate the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Check if the role already exists
      let existingPermission = await Permission.findOne({ role });
  
      // If the role already exists, update its permissions
      if (existingPermission) {
        const uniquePermissions = [...new Set([...existingPermission.permission, ...permission])];
        existingPermission.permission = uniquePermissions;
        await existingPermission.save();
      } else {
        // If the role doesn't exist, create a new permission document
        existingPermission = new Permission({
          role,
          permission,
        });
  
        // Save the new permission to the database
        await existingPermission.save();
      }
  
      // Respond with the saved permission
      res.json(existingPermission);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  };
  
  module.exports = addPermission;
  

const fetchPermission = async (req, res) => {
  try {
    const userId = req.params.userId;
      // Fetch user role from the User model
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

    // Fetch role permissions from the Permission model based on the user's role
    const rolePermissions = await Permission.findOne({ role: user.role });

    if (!rolePermissions) {
        return res.status(404).json({ message: 'Role permissions not found' });
      }
      res.json({ permissions: rolePermissions.permission });
  } catch (error) {
    console.error('Error fetching user roles and permissions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
    addPermission,
  fetchPermission,
};
