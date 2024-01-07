const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                err.message = err.message.split(": ")[2] || 'Validation Error'
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            } else if (err.name === 'MongoServerError' && err.code == 11000) {
                return res.status(400).json({
                    success: false,
                    message: 'Duplicate record, resource already exists!'
                })
            } else {
                next(err);
            }
        });
}

module.exports = asyncHandler