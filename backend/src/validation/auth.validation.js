const { body, validationResult } = require('express-validator')
async function validate(req, res, next) {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(404).json({
            error: error.array()
        })
    }
    next()
}

const validationRegister = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isNumeric().withMessage("Password must be Number").isLength({ min: 5 }).withMessage("passwword Must be at least 5 number"),
    validate
]

const loginRegister = [
    body('email').isEmail().withMessage('Email is Required'),
    body('fullName').isEmpty().withMessage('fullName Is required'),
    body('password').isLength({ min: 5 }).withMessage("passwword Must be at least 5 number"),
    validate
]




module.exports = { validationRegister, loginRegister }