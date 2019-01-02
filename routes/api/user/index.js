const express = require("express");
const router = express.Router();
const userController = require("./userController");

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

module.exports = router;
