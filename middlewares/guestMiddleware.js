const guestMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        return res.status(400).json({
            success: false,
            message: 'You are already authenticated user'
        });
    }
    next();
}

module.exports = guestMiddleware;