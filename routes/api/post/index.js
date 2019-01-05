const express = require('express');
const passport = require('passport');

const router = express.Router();

const postController = require('./postController');
const postValidator = require('./postValidator');

/**
 * @route POST api/post
 * @description Create a new post
 * @access Private
 */
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    postController.createPostController
);

module.exports = router;
