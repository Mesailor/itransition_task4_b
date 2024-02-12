const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastLoginTime: Date,
    registrationTime: Date,
    status: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;