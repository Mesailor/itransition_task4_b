const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    uniquie: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastLoginTime: Date,
  registrationTime: Date,
  status: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
