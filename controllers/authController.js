const User = require('../models/user');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const { generateRandomToken, storeToken, isValidToken, setNewPassword } = require('../utils/resetPassword');
const sendEmail = require('../utils/sendEmail');
const messages = require('../utils/messages');

const register = asyncErrorHandler(async (req, res) => {
    const { username, email, password } = req.body;
    let user = await User.create({ username, email, password });
    let token = await user.generateSignedJwtToken();
    await user.save();

    res.status(200).json({
        success: true,
        message: messages.success.USER_REGISTRED,
        data: user,
        token
    });
});

const login = asyncErrorHandler(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const isPasswordValid = user.isPasswordsMatched(req.body.password);
        if (isPasswordValid) {
            let token = await user.generateSignedJwtToken();
            await user.save()
            res.status(200).json({
                success: true,
                message: messages.success.USER_LOGIN,
                data: user,
                token
            });
        } else {
            res.status(401).json({
                success: false,
                message: messages.error.INVALID_CREDENTIALS
            });
        }
    } else {
        res.status(401).json({
            success: false,
            message: messages.error.INVALID_CREDENTIALS
        });
    }
});

const getAuthenticatedUser = asyncErrorHandler(async (req, res) => {
    let user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: messages.error.RESOURCE_NOT_FOUND
        });
    }

    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOUCRE,
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
        message: messages.success.USER_LOGOUT
    });
});

const forgotPassword = asyncErrorHandler(async (req, res) => {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
        return res.status(400).json({
            success: false,
            message: messages.error.INVALID_CREDENTIALS
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
        message: messages.success.FORGOT_PASSWORD
    });
});

const resetPassword = asyncErrorHandler(async (req, res) => {
    const resetPasswordToken = req.params.token;
    const isResetTokenValid = await isValidToken(resetPasswordToken);
    if (isResetTokenValid) {
        await setNewPassword(resetPasswordToken, req.body.password);
        return res.status(200).json({
            success: true,
            message: messages.success.RESET_PASSWORD
        });
    }
    return res.status(400).json({
        success: false,
        message: messages.error.INVALID_TOKEN
    });
});


const updatePassword = asyncErrorHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const { oldPassword, newPassword } = req.body;
    if (!user) {
        return res.status(401).json({
            success: false,
            message: messages.error.NOT_AUTHORIZED
        });
    }

    const isPasswordConfirmed = user.isPasswordsMatched(oldPassword);
    if (isPasswordConfirmed) {
        user.password = newPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: messages.success.UPDATE_PASSWORD,
        })
    } else {
        return res.status(400).json({
            success: false,
            message: messages.error.INCORRECT_OLD_PASSWORD
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