const { body } = require('express-validator');
const respondWithValidationErrors = require('./validatorHelper');

const createUserValidator = async (req, res, next) => {
    await body('username')
        .isLength({ min: 5 })
        .withMessage('Username should not be less than 5 charactes')
        .isAlphanumeric()
        .withMessage('Username should only contains letters and numbers')
        .run(req);
    await body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .escape()
        .run(req);

    await respondWithValidationErrors(req, res, next);
}

module.exports = createUserValidator;