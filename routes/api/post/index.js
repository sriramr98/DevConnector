const express = require('express');
const passport = require('passport');

const router = express.Router();

const postController = require('./postController');
const postValidator = require('./postValidator');

/**
 * @route POST api/posts
 * @description Create a new post
 * @access Private
 */
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    postController.createPostController
);

/**
 * @route GET api/posts
 * @description Get all posts
 * @access Public
 */
router.get('/', postController.getAllPostsController);

/**
 * @router GET api/posts/:post_id
 * @description Get a specific post by id
 * @access Public
 */
router.get('/:id', postController.getPostByIdController);

/**
 * @route DELETE api/posts/:post_id
 * @description Delete a specific post by id
 * @access Private
 */
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    postController.deletePostByIdController
);

/**
 * @route POST api/posts/like/:post_id
 * @description Like a specifi post
 * @access Private
 */
router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    postController.likePostController
);

/**
 * @route POST api/posts/like/:post_id
 * @description Like a specifi post
 * @access Private
 */
router.post(
    '/unlike/:id',
    passport.authenticate('jwt', { session: false }),
    postController.unlikePostController
);

/**
 * @route POST api/posts/comment/:post_id
 * @description Create a comment for a specific post
 * @access Private
 */
router.post(
    '/comment/:id',
    passport.authenticate('jwt', { session: false }),
    postController.addCommentController
);

/**
 * @route DELETE api/posts/comment/:post_id/:comment_id
 * @description Delete a comment for a specific post
 * @access Private
 */
router.delete(
    '/comment/:postId/:commentId',
    passport.authenticate('jwt', { session: false }),
    postController.deleteCommentController
);

module.exports = router;
