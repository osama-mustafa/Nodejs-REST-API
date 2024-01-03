const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');



router.get('/', authenticateUser, adminMiddleware, getUsers);
router.post('/', authenticateUser, adminMiddleware, createUser);
router.get('/:id', authenticateUser, adminMiddleware, getUser);
router.put('/:id', authenticateUser, adminMiddleware, updateUser);
router.delete('/:id', authenticateUser, adminMiddleware, deleteUser);

module.exports = router;
