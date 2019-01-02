const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: String,
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", function(next) {
  const user = this;
  if (user.isModified("password")) {
    console.log("Modifying password");
    bcrypt
      .genSalt(10)
      .then(salt => {
        return bcrypt.hash(user.password, salt);
      })
      .then(hash => {
        user.password = hash;
        next();
      })
      .catch(e => console.log(`Error during hashing password ${e}`));
  } else {
    next();
  }
});

module.exports = User = mongoose.model("user", UserSchema);
