const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: [50, 'Username should not exceed 50 characters'],
        unique: [true, 'Username already exists']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    blacklist_tokens: {
        type: [String],
    },
}, {
    timestamps: true
});

// Hash password before save or when user change password
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            let salt = await bcrypt.genSalt();
            let hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
            next()
        } catch (err) {
            return next(err)
        }
    } else {
        next();
    }
});

// Generate JWT token
UserSchema.methods.generateSignedJwtToken = function () {
    const user = {
        id: this._id,
        username: this.username,
        role: this.role
    }
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

// Compare entered password with hashed password
UserSchema.methods.isPasswordsMatched = function (enteredPassword) {
    return bcrypt.compareSync(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);