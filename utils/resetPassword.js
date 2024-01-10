const crypto = require('crypto');
const ResetPasswordToken = require('../models/resetPasswordToken');
const User = require('../models/user');

const generateRandomToken = async (size = 32) => {
    try {
        const buf = await crypto.randomBytes(size);
        const randomString = buf.toString('hex');
        return randomString;
    } catch (err) {
        throw err;
    }
}

const storeToken = async (hashedToken, userId) => {
    try {
        const token = await ResetPasswordToken.create({
            token: hashedToken,
            user: userId
        });
        return token;

    } catch (err) {
        throw err;
    }
}

const isValidToken = async (token) => {
    let resetPasswordToken = await ResetPasswordToken.findOne({ token: token, isUsed: false });
    if (resetPasswordToken?.expiredAt?.getTime() > Date.now()) {
        return true;
    }
}

const setNewPassword = async (validToken, newPassword) => {
    try {
        const token = await ResetPasswordToken.findOne({ token: validToken });
        const user = await User.findById(token.user);
        user.password = newPassword;
        token.isUsed = true;
        await user.save();
        await token.save();
        return true;

    } catch (err) {
        throw err
    }
}

module.exports = {
    generateRandomToken,
    storeToken,
    isValidToken,
    setNewPassword
};