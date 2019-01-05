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

module.exports = {
    createPostController
};
