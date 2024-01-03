const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
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
        next();
    });
}

module.exports = authenticateUser