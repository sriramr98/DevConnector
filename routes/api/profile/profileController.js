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

module.exports = {
    getCurrentProfileController,
    createProfileController,
    getProfileWithHandleController,
    getProfileWithIdController
};
