const User = require('../models/user');
const messages = require('../utils/messages');

const adminMiddleware = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: messages.error.FORBIDDEN
        });
    }
    next();
}

module.exports = adminMiddleware;