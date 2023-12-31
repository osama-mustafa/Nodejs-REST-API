const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/auth');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');



router.get('/', authenticateUser, getUsers);
router.get('/:id', authenticateUser, getUser);
router.post('/', authenticateUser, createUser);
router.put('/:id', authenticateUser, updateUser);
router.delete('/:id', authenticateUser, deleteUser);

module.exports = router;
