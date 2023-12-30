const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                err.message = err.message.split(": ")[2] || 'Validation Error'
                res.status(400).json({
                    success: false,
                    message: err.message
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
}

module.exports = asyncHandler
