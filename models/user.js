const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// Hash password before save
UserSchema.pre('save', async function (next) {
    let user = this;
    if (user.isModified('password')) {
        let salt = await bcrypt.genSalt();
        await bcrypt.hash(this.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    } else {
        next();
    }
})

module.exports = mongoose.model('User', UserSchema);