const mongoose = require('mongoose');
const { Schema } = mongoose;

const PermissionSchema = new Schema({
  
    role:{
        type: String,
        required: true
    },
    permission : []
  });

  module.exports = mongoose.model('permission', PermissionSchema);