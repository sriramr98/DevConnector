const User = require("./../../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./../../../config/keys");

/**
 * @route POST /api/users/register
 * @description Register a new user
 * @access Public
 */
const userRegisterContoller = async (req, res) => {
  const userWithEmail = await User.findOne({
    email: req.body.email
  });
  if (userWithEmail) {
    return res.status(400).json({
      email: "Email already exists"
    });
  }

  const avatar = gravatar.url(req.body.email, {
    s: "200", // Size
    r: "pg", // Rating
    d: "mm" // Default
  });
  const newUser = await new User({
    name: req.body.name,
    email: req.body.email,
    avatar,
    password: req.body.password
  }).save();

  return res.json(newUser);
};

const userLoginController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userWithEmail = await User.findOne({
    email
  });

  if (!userWithEmail) {
    return res.status(404).json({
      email: "User not found"
    });
  }

  const isMatch = await bcrypt.compare(password, userWithEmail.password);
  if (!isMatch) {
    return res.status(400).json({
      password: "Password is incorrect"
    });
  }

  // create jwt
  const payload = {
    id: userWithEmail.id,
    name: userWithEmail.name,
    avatar: userWithEmail.avatar
  };

  const token = await jwt.sign(payload, keys.JWT_SECRET_KEY, {
    expiresIn: "1d"
  });

  return res.json({
    success: true,
    token: `Bearer ${token}`
  });
};

module.exports = {
  userRegisterContoller,
  userLoginController
};
