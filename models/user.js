const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  ipAddress: {
    type: String,
    require: true,
  },
});

// static method for signup

userSchema.statics.signup = async function (
  name,
  username,
  email,
  password,
  ipAddress
) {
  // validating
  if (!name || !username || !email || !password || !ipAddress) {
    throw Error("All fields must be filled.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password must be uppercase, lowercase, number and symbol.");
  }

  const existedEmail = await this.findOne({ email });
  if (existedEmail) {
    throw Error("Email already used.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  // create user
  const user = await this.create({
    name,
    username,
    email,
    password: hashPass,
    ipAddress,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password, ipAddress) {
  if (!email || !password || !ipAddress) {
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ email, ipAddress });
  if (!user) {
    throw Error("Invalid email or restricted ipAddress");
  }

  // compare password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password.");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
