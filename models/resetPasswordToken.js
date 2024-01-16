const mongoose = require('mongoose');

const ResetPasswordTokenSchema = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    expiredAt: {
        type: Date,
        default: () => Date.now() + 10 * 60 * 1000
    },
    isUsed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('ResetPasswordToken', ResetPasswordTokenSchema);