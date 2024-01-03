const User = require('../models/user');
const jwt = require('jsonwebtoken');

const isTokenBlacklisted = async (req, res, next) => {
    let user;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    const token = authHeader.split(' ')[1];
    const privateKey = process.env.JWT_SECRET;
    jwt.verify(token, privateKey, function (err, decoded) {
        if (err) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        req.user = decoded;
        req.token = token;
    });

    user = await User.findById(req.user.id);
    if (user.blacklist_tokens.length && user.blacklist_tokens.includes(req.token)) {
        return res.status(401).json({
            success: false,
            message: 'Revoked token! Please login again or create a new account'
        });
    }
    next();
}
module.exports = isTokenBlacklisted