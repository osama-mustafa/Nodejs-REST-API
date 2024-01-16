const User = require('../models/user');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const { generateRandomToken, storeToken, isValidToken, setNewPassword } = require('../utils/resetPassword');
const sendEmail = require('../utils/sendEmail');

const register = asyncErrorHandler(async (req, res) => {
    const { username, email, password } = req.body;
    let user = await User.create({ username, email, password });
    let token = user.generateSignedJwtToken();
    await user.save();

    res.status(200).json({
        success: true,
        message: 'User registered successfully',
        data: user,
        token
    });
});

const login = asyncErrorHandler(async (req, res) => {
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
            });
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

const getAuthenticatedUser = asyncErrorHandler(async (req, res) => {
    let user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Fetch authenticated user successfully',
        data: user
    })
});

const logout = asyncErrorHandler(async (req, res) => {
    const token = req.token;
    let user = await User.findById(req.user.id);
    await user.updateOne({ $push: { blacklist_tokens: token } })
    await user.save();
    return res.status(200).json({
        success: true,
        message: 'You logout successfully!'
    });
});

const forgotPassword = asyncErrorHandler(async (req, res) => {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'Invalid credentials for resetting password'
        });
    }
    const token = await generateRandomToken();
    await storeToken(token, user._id);
    const resetPasswordURL = `http://${req.hostname}:${process.env.PORT}/api/v1/auth/reset-password/${token}`;
    let htmlMessage = `
                <h2>Hello</h2><br>
                <h2>Follow this URL to reset password</h2><br>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
    `
    const options = {
        sender: process.env.EMAIL_SENEDER,
        receiver: req.body.email,
        html: htmlMessage
    }
    await sendEmail(options);
    res.status(200).json({
        success: true,
        message: 'If provided email is correct, we will send you reset password instructions'
    });
});

const resetPassword = asyncErrorHandler(async (req, res) => {
    const resetPasswordToken = req.params.token;
    const isResetTokenValid = await isValidToken(resetPasswordToken);
    if (isResetTokenValid) {
        await setNewPassword(resetPasswordToken, req.body.password);
        return res.status(200).json({
            success: true,
            message: 'New password has been set successfully, you can now login with the new password'
        });
    }
    return res.status(400).json({
        success: false,
        message: 'your reset password token is expired or invalid'
    });
});


const updatePassword = asyncErrorHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const { oldPassword, newPassword } = req.body;
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized'
        });
    }

    const isPasswordConfirmed = user.isPasswordsMatched(oldPassword);
    if (isPasswordConfirmed) {
        user.password = newPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'New password updated successfully',
        })
    } else {
        return res.status(400).json({
            success: false,
            message: 'Old password is incorrect'
        });
    }

})

module.exports = {
    register,
    login,
    logout,
    getAuthenticatedUser,
    forgotPassword,
    resetPassword,
    updatePassword
}