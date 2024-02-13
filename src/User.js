const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
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
