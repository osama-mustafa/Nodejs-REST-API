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
    user.tokens = [token];
    await user.save()

    res.status(200).json({
        success: true,
        message: 'User registered successfully',
        data: user,
        token
    })
});

const login = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const isPasswordValid = user.isPasswordsMatched(req.body.password);
        if (isPasswordValid) {
            let token = user.generateSignedJwtToken();
            user.tokens = [token];
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
}

const getAuthenticatedUser = asyncHandler(async (req, res) => {
    console.log(req, 'ssssssssssssssssssss')
    let user = await User.findById(req.user.id);
    console.log(user, 'user');
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
})

const logout = async (req, res) => {
};

module.exports = {
    register,
    login,
    logout,
    getAuthenticatedUser
}


