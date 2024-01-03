const express = require('express');
const router = express.Router();
const { register, login, logout, getAuthenticatedUser } = require('../controllers/authController');
const authenticateUser = require('../middlewares/auth');
const guestMiddleware = require('../middlewares/guest');


router.post('/register', guestMiddleware, register);
router.post('/login', guestMiddleware, login);
router.post('/logout', authenticateUser, logout);
router.get('/me', authenticateUser, getAuthenticatedUser)

module.exports = router;


