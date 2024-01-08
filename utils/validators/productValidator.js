const { body } = require('express-validator');
const respondWithValidationErrors = require('./validatorHelper');

const createProductValidator = async (req, res, next) => {
    console.log(req.body);
    await body('name')
        .escape()
        .notEmpty()
        .withMessage('Name is required')
        .run(req);
    await body('description')
        .escape()
        .notEmpty()
        .withMessage('Description is required')
        .isString()
        .run(req);
    await body('file')
        .optional()
        .run(req)

    await respondWithValidationErrors(req, res, next);
}


module.exports = createProductValidator;
