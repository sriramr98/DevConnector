const express = require('express');
const router = express.Router();
const passport = require('passport');

const profileController = require('./profileController');
const profileValidator = require('./profileValidator');

/**
 * @route /api/profile
 * @description Returns the profile details of the current user
 * @access Private
 */
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    profileController.getCurrentProfileController
);

module.exports = router;
