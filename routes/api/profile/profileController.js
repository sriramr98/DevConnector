const Profile = require('./../../../models/Profile');
const User = require('./../../../models/User');

const getCurrentProfileController = async (req, res) => {
    const errors = {};
    Profile.findOne({
        user: req.user.id
    })
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

module.exports = {
    getCurrentProfileController
};
