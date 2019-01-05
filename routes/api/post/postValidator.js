const _ = require('lodash');

const createPostValidation = post => {
    let errors = {};

    if (_.isEmpty(post.text)) {
        errors.text = 'Post text cannot be empty';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    };
};

module.exports = {
    createPostValidation
};
