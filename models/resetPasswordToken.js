const mongoose = require('mongoose');

const ResetPasswordTokenSchema = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiredAt: {
        type: Date,
        default: () => Date.now() + 10 * 60 * 1000
    },
    isUsed: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('ResetPasswordToken', ResetPasswordTokenSchema);