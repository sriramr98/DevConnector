const Profile = require('./../../../models/Profile');
const User = require('./../../../models/User');
const profileValidator = require('./profileValidator');
const { ObjectId } = require('mongodb');

const getCurrentProfileController = async (req, res) => {
    const errors = {};
    Profile.findOne({
        user: req.user.id
    })
        .populate('user')
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(e => {
            console.log(e);
            res.status(404).json(e);
        });
};

const createProfileController = async (req, res) => {
    const errors = {};
    const profileFields = req.profile; // sent from the validator.
    const profile = await Profile.findOne({
        user: req.user.id
    });
    if (profile) {
        const updatedProfile = await Profile.findOneAndUpdate(
            {
                user: req.user.id
            },
            {
                $set: profileFields
            },
            {
                new: true
            }
        );
        return res.json(updatedProfile);
    } else {
        // create a new profile
        // check if handle exists
        const profileWithHandle = await Profile.findOne({
            handle: profileFields.handle
        });
        if (profileWithHandle) {
            errors.handle = 'That handle already exists';
            return res.status(400).json(errors);
        }

        const savedProfile = await new Profile(profileFields).save();
        return res.json(savedProfile);
    }
};

const getProfileWithHandleController = (req, res) => {
    const errors = {};
    Profile.findOne({
        handle: req.params.handle
    })
        .populate('user', ['name', 'avatar', 'email'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(e =>
            res.status(400).json({
                noprofile: 'There is no profile for this user'
            })
        );
};

const getProfileWithIdController = (req, res) => {
    const errors = {};
    const userId = req.params.id;
    if (!ObjectIdc.isValid(userId)) {
        return res.status(400).json({
            error: 'Invalid User ID'
        });
    }
    Profile.findOne({
        user: userId
    })
        .populate('user', ['name', 'avatar', 'email'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(e => res.status(400).json(e));
};

const getAllProfilesController = (req, res) => {
    const errors = {};
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
            }
            return res.json(profiles);
        })
        .catch(e =>
            res.status(400).json({ noprofile: 'There are no profiles' })
        );
};

const addExperienceToProfileController = (req, res) => {
    let { errors, isValid } = profileValidator.validateAddExperienceRoute(
        req.body
    );

    if (!isValid) {
        return res.status(400).json(errors);
    }

    errors = {};
    const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
    };
    Profile.findOneAndUpdate(
        {
            user: req.user.id
        },
        {
            $push: {
                experience: newExp
            }
        },
        {
            new: true
        }
    )
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'Unable to find a profile for the user';
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(e => res.status(400).json(e));
};

const addEducationToProfileController = (req, res) => {
    let { errors, isValid } = profileValidator.validateAddEducationRoute(
        req.body
    );
    if (!isValid) {
        return res.status(400).json(errors);
    }
    errors = {};
    const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        isCurrent: req.body.isCurrent,
        description: req.body.description
    };

    Profile.findOneAndUpdate(
        {
            user: req.user.id
        },
        {
            $push: {
                education: newEducation
            }
        },
        {
            new: true
        }
    )
        .then(profile => {
            errors.noprofile = 'A profile does not exist for the user';
            if (!profile) return res.status(400).json(errors);
            return res.json(profile);
        })
        .catch(e => res.status(400).json(e));
};

const deleteExperienceController = (req, res) => {
    Profile.findOneAndUpdate(
        {
            user: req.user.id
        },
        {
            $pull: {
                experience: {
                    _id: req.params.id
                }
            }
        },
        {
            new: true
        }
    )
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No profile found for the given user';
                return res.status(400).json(errors);
            }

            return res.json(profile);
        })
        .catch(e => res.status(404).json(e));
};

const deleteEducationController = (req, res) => {
    Profile.findOneAndUpdate(
        {
            user: req.user.id
        },
        {
            $pull: {
                education: {
                    _id: req.params.id
                }
            }
        },
        {
            new: true
        }
    )
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No profile found for the given user';
                return res.status(400).json(errors);
            }

            return res.json(profile);
        })
        .catch(e => res.status(404).json(e));
};

const deleteProfileController = (req, res) => {
    Profile.findOneAndDelete({
        user: req.user.id
    })
        .then(() => {
            return User.findByIdAndDelete(req.user.id);
        })
        .then(() => {
            return res.json({ success: true });
        })
        .catch(e => res.status(400).json(e));
};

module.exports = {
    getCurrentProfileController,
    createProfileController,
    getProfileWithHandleController,
    getProfileWithIdController,
    getAllProfilesController,
    addExperienceToProfileController,
    addEducationToProfileController,
    deleteExperienceController,
    deleteEducationController,
    deleteProfileController
};
