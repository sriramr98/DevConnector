const Validator = require('validator');
const _ = require('lodash');

const registerValidator = data => {
    let errors = {};
    data.name = _.isEmpty(data.name) ? '' : data.name;
    data.email = _.isEmpty(data.email) ? '' : data.email;
    data.password = _.isEmpty(data.password) ? '' : data.password;
    data.password2 = _.isEmpty(data.password2) ? '' : data.password2;

    if (
        !Validator.isLength(data.name, {
            min: 2,
            max: 30
        })
    ) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if (_.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email format';
    }

    if (_.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (
        !Validator.isLength(data.password, {
            min: 6
        })
    ) {
        errors.password = 'Password must be atleast 6 characters.';
    }

    if (_.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (_.isEmpty(data.password2)) {
        errors.password2 = 'Password is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password = 'Passwords must match';
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    };
};

const loginValidator = data => {
    let errors = {};
    data.email = _.isEmpty(data.email) ? '' : data.email;
    data.password = _.isEmpty(data.password) ? '' : data.password;

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email format';
    }

    if (_.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (
        !Validator.isLength(data.password, {
            min: 6
        })
    ) {
        errors.password = 'Password must be atleast 6 characters.';
    }

    if (_.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    return {
        errors,
        isValid: _.isEmpty(errors)
    };
};

module.exports = {
    registerValidator,
    loginValidator
};
