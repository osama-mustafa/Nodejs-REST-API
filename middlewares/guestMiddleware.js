const guestMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        return res.status(400).json({
            success: false,
            message: 'Your are not authorized to access this route'
        });
    }
    next();
}

module.exports = guestMiddleware;