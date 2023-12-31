const User = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');
const generateToken = require('../middlewares/auth');

const register = asyncHandler(async (req, res) => {
    let payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }
    let user = await User.create(payload);
    let token = user.generateSignedJwtToken();
    res.status(200).json({
        success: true,
        message: 'User registered successfully',
        data: user,
        token
    })
});

const login = async (req, res) => {

};

const logout = async (req, res) => {

};

module.exports = {
    register,
    login,
    logout
}


