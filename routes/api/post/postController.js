const mongoose = require('mongoose');
const Post = require('./../../../models/Post');
const postValidator = require('./postValidator');

const createPostController = (req, res) => {
    let { errors, isValid } = postValidator.createPostValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    errors = {};
    const newPost = new Post({
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
        user: req.user.id
    });

    newPost
        .save()
        .then(post => res.json(post))
        .catch(e => {
            console.log(e);
            errors.error = 'Unable to create post';
            res.status(400).json(errors);
        });
};

const getAllPostsController = (req, res) => {
    Post.find()
        .sort({
            date: -1
        })
        .then(posts => res.json(posts))
        .catch(e => res.status(400).json(e));
};

const getPostByIdController = (req, res) => {
    console.log(req.params.id);
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    error: 'No post found for the given ID'
                });
            }
            res.json(post);
        })
        .catch(e => res.status(400).json(e));
};

const deletePostByIdController = (req, res) => {
    Post.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
    })
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    success: false
                });
            }
            return res.json({
                success: true
            });
        })
        .catch(e => {
            return res.status(404).json({
                error: 'Unable to find post to delete'
            });
        });
};

const likePostController = (req, res) => {
    const postId = req.params.id;
    const conditions = {
        _id: postId,
        'likes.user': {
            $ne: req.user.id
        }
    };

    const update = {
        $addToSet: {
            likes: {
                user: req.user.id
            }
        }
    };

    Post.findOneAndUpdate(conditions, update, {
        new: true
    })
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    error: 'You have already liked the post'
                });
            }
            return res.json(post);
        })
        .catch(e => {
            console.log(e);
            res.status(500).json(e);
        });
};

const unlikePostController = (req, res) => {
    const condition = {
        _id: req.params.id,
        likes: {
            $elemMatch: {
                user: req.user.id
            }
        }
    };

    const update = {
        $pull: {
            likes: {
                user: req.user.id
            }
        }
    };

    Post.findOneAndUpdate(condition, update, {
        new: true
    })
        .then(post => {
            if (!post) {
                return res.status(400).json({
                    error: 'You have not liked the post to unlike it'
                });
            }
            return res.json(post);
        })
        .catch(e => {
            console.log(e);
            return res.json(e);
        });
};

const addCommentController = (req, res) => {
    let { errors, isValid } = postValidator.addCommentValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    errors = {};
    const comment = {
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
        user: req.user.id
    };
    Post.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            $push: {
                comments: comment
            }
        },
        {
            new: true
        }
    )
        .then(post => {
            if (!post) {
                errors.error = 'Unable to add comment to the post';
                return res.status(400).json(errors);
            }
            return res.json(post);
        })
        .catch(e => res.json(e));
};

const deleteCommentController = (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    console.log(postId, commentId);

    Post.findOneAndUpdate(
        {
            _id: postId,
            comments: {
                $elemMatch: {
                    _id: commentId,
                    user: req.user.id
                }
            }
        },
        {
            $pull: {
                comments: {
                    _id: commentId,
                    user: req.user.id
                }
            }
        },
        {
            new: true
        }
    )
        .then(post => {
            if (!post) {
                return res.status(400).json({
                    error: 'Unable to remove comment from the post'
                });
            }
            return res.json(post);
        })
        .catch(e => res.json(e));
};

module.exports = {
    createPostController,
    getAllPostsController,
    getPostByIdController,
    deletePostByIdController,
    likePostController,
    unlikePostController,
    addCommentController,
    deleteCommentController
};
