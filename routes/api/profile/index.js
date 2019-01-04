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

/**
 * @route /api/profile/handle/:handle
 * @description Get profile by handle
 * @access Public
 */
router.get('/handle/:handle', profileController.getProfileWithHandleController);

/**
 * @route /api/profile/user/:user_id
 * @description Get profile by handle
 * @access Public
 */
router.get('/user/:id', profileController.getProfileWithIdController);

/**
 * @route /api/profile/all
 * @description Get all profiles
 * @access Public
 */
router.get('/all', profileController.getAllProfilesController);

/**
 * @route /api/profile/experience
 * @description Add an experience to profile
 * @access Private
 */
router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    profileController.addExperienceToProfileController
);

/**
 * @route /api/profile/education
 * @description Add an education to profile
 * @access Private
 */
router.post(
    '/education',
    passport.authenticate('jwt', { session: false }),
    profileController.addEducationToProfileController
);

/**
 * @route /api/profile/experience/:exp_id
 * @description Delete experience from profile
 * @access Private
 */
router.delete(
    '/experience/:id',
    passport.authenticate('jwt', { session: false }),
    profileController.deleteExperienceController
);

module.exports = router;
