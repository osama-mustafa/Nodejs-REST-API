const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const ResetPasswordToken = require('../models/resetPasswordToken');
const User = require('../models/user');

const generateRandomToken = async (size = 32) => {
    try {
        const buf = await crypto.randomBytes(size);
        const randomString = buf.toString('hex');
        return randomString;
    } catch (err) {
        console.log(err);
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
        console.log(err);
        throw err;
    }
}

const isValidToken = async (token) => {
    let resetPasswordToken = await ResetPasswordToken.findOne({ token: token });
    return resetPasswordToken && resetPasswordToken?.expiredAt?.getTime() > Date.now()
        ? true
        : false
}

const setNewPassword = async (validToken, newPassword) => {
    try {
        const token = await ResetPasswordToken.findOne({ token: validToken });
        const user = await User.findById(token.user);
        user.password = newPassword;
        await user.save();
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