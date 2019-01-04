const Validator = require('validator');
const _ = require('lodash');

// CREATE/EDIT PROFILE ROUTE

const validateCreatProfileRoute = (req, res, next) => {
    const { errors, isValid } = validateCreateProfileData(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    assembleDataForCreateProfile(req, res, next);
};

const validateCreateProfileData = data => {
    let errors = {};

    data.handle = _.isEmpty(data.handle) ? '' : data.handle;
    data.status = _.isEmpty(data.status) ? '' : data.status;
    data.skills = _.isEmpty(data.skills) ? '' : data.skills;

    if (
        !Validator.isLength(data.handle, {
            min: 2,
            max: 40
        })
    ) {
        errors.handle = 'The handle must be between 2 and 40 characters';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Profile handle is required';
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Profile handle is required';
    }

    if (!_.isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }

    if (!_.isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL';
        }
    }

    if (!_.isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL';
        }
    }

    if (!_.isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL';
        }
    }

    if (!_.isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL';
        }
    }

    if (!_.isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL';
        }
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    };
};

// This middleware assembles and organises form data into an object to be used by the controller for CREATE/UPDATE
const assembleDataForCreateProfile = (req, res, next) => {
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
        profileFields.githubusername = req.body.githubusername;

    // Split skills into array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    // Social Links
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    req.profile = profileFields;
    next();
};

const validateAddExperienceRoute = data => {
    let errors = {};
    data.title = _.isEmpty(data.title) ? '' : data.title;
    data.company = _.isEmpty(data.company) ? '' : data.company;
    data.from = _.isEmpty(data.from) ? '' : data.from;

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Job Title is required';
    }

    if (Validator.isEmpty(data.company)) {
        errors.title = 'Company field is required';
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'From field is required';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    };
};

module.exports = {
    validateCreatProfileRoute,
    validateAddExperienceRoute
};
