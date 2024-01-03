const User = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');

const register = asyncHandler(async (req, res) => {
    let payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }
    let user = await User.create(payload);
    let token = user.generateSignedJwtToken();
    await user.save()

    res.status(200).json({
        success: true,
        message: 'User registered successfully',
        data: user,
        token
    })
});

const login = asyncHandler(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const isPasswordValid = user.isPasswordsMatched(req.body.password);
        if (isPasswordValid) {
            let token = user.generateSignedJwtToken();
            await user.save()
            res.status(200).json({
                success: true,
                message: 'User loggedin successfully',
                data: user,
                token
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});

const getAuthenticatedUser = asyncHandler(async (req, res) => {
    let user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Something went wrong'
        })
    }

    res.status(200).json({
        success: true,
        message: 'Fetch authenticated user successfully',
        data: user
    })
});

const logout = asyncHandler(async (req, res) => {
    const token = req.token;
    let user = await User.findById(req.user.id);
    user.blacklist_tokens = [token];
    await user.save();
    return res.status(200).json({
        success: true,
        message: 'You logout successfully!'
    });

});

module.exports = {
    register,
    login,
    logout,
    getAuthenticatedUser
}


