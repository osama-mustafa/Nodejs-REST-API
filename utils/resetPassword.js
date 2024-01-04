const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const ResetPasswordToken = require('../models/resetPasswordToken');

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

const hashToken = async (randomString) => {
    try {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(randomString, salt);
        return hash
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

module.exports = {
    generateRandomToken, hashToken, storeToken
};