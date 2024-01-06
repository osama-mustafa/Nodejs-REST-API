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

router.get('/', [
    authenticationMiddleware,
    isTokenBlacklisted,
    adminMiddleware,
    getUsers
]);

router.post('/', [
    authenticationMiddleware,
    isTokenBlacklisted,
    adminMiddleware,
    createUser
]);

router.get('/:id', [
    authenticationMiddleware,
    isTokenBlacklisted,
    adminMiddleware,
    getUser
]);

router.put('/:id', [
    authenticationMiddleware,
    isTokenBlacklisted,
    adminMiddleware,
    updateUser
]);

router.delete('/:id', [
    authenticationMiddleware,
    isTokenBlacklisted,
    adminMiddleware,
    deleteUser
]);

module.exports = router;
