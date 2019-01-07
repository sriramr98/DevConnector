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

module.exports = {
    createPostController,
    getAllPostsController,
    getPostByIdController,
    deletePostByIdController
};
