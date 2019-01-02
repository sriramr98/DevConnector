const User = require("./../../../models/User");
const gravatar = require("gravatar");

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

module.exports = {
  userRegisterContoller
};
