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

/**
 * @route /api/profile
 * @description Create / Update the profile of a user
 * @access Private
 */
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    profileValidator.validateCreatProfileRoute,
    profileController.createProfileController
);

module.exports = router;
