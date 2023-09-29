var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    photo: String,
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String, // Change this line to specify the type as "String"
      enum: ["admin", "user"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
});
module.exports = mongoose.model('user', userSchema);    

// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     name: String,
//     photo: String,
//     googleId: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     role: {
//       type: String, // Change this line to specify the type as "String"
//       enum: ["admin", "user"],
//       default: "user",
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     }
// });

// const User = mongoose.models.users || mongoose.model('users', userSchema);

// module.exports = User;