const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const isTokenBlacklisted = require('../middlewares/blacklistToken');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const {
    createUserValidator,
    updateUserValidator
} = require('../utils/validators/userValidator');


router.use(authenticationMiddleware, isTokenBlacklisted, adminMiddleware)

router.get('/', getUsers);
router.post('/', createUserValidator, createUser);
router.get('/:id', getUser);
router.put('/:id', updateUserValidator, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
