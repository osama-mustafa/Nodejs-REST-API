const adminMiddleware = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Forbidden!'
        });
    }
    next();
}

module.exports = adminMiddleware;