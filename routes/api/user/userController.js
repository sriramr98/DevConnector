const User = require('./../../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('./../../../config/keys');

const userValidator = require('./userValidator');

/**
 * @route POST /api/users/register
 * @description Register a new user
 * @access Public
 */
const userRegisterContoller = async (req, res) => {
    const { errors, isValid } = userValidator.registerValidator(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const userWithEmail = await User.findOne({
        email: req.body.email
    });
    if (userWithEmail) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
    });
    const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
    }).save();

    return res.json(newUser);
};

const userLoginController = async (req, res) => {
    const { errors, isValid } = userValidator.loginValidator(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    const userWithEmail = await User.findOne({
        email
    });

    if (!userWithEmail) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
    }

    const isMatch = await bcrypt.compare(password, userWithEmail.password);
    if (!isMatch) {
        errors.password = 'Password is incorrect';
        return res.status(400).json(errors);
    }

    // create jwt
    const payload = {
        id: userWithEmail.id,
        name: userWithEmail.name,
        avatar: userWithEmail.avatar
    };

    const token = await jwt.sign(payload, keys.JWT_SECRET_KEY, {
        expiresIn: '1d'
    });

    return res.json({
        success: true,
        token: `Bearer ${token}`
    });
};

const currentUserController = async (req, res) => {
    return res.json(req.user);
};

module.exports = {
    userRegisterContoller,
    userLoginController,
    currentUserController
};
