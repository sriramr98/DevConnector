const express = require("express");
const router = express.Router();
const userController = require("./userController");
const passport = require("passport");

router.get("/test", (req, res) => {
  return res.json({
    msg: "USERS WORK"
  });
});

/**
 * @route POST /api/users/register
 * @description Register a new user
 * @access Public
 */
router.post("/register", userController.userRegisterContoller);

/**
 * @route POST /api/users/login
 * @description Login a new user
 * @access Public
 */
router.post("/login", userController.userLoginController);

/**
 * @route POST /api/users/current
 * @description Returns the current user
 * @access Private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  userController.currentUserController
);

module.exports = router;
