const messages = require("../utils/messages");

const guestMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        return res.status(400).json({
            success: false,
            message: messages.error.NOT_AUTHORIZED
        });
    }
    next();
}

module.exports = guestMiddleware;