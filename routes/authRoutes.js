const express = require('express');
const router = express.Router();
const { register, login, logout, getAuthenticatedUser } = require('../controllers/authController');
const authenticateUser = require('../middlewares/auth');


router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateUser, logout);
router.get('/me', authenticateUser, getAuthenticatedUser)

module.exports = router;


