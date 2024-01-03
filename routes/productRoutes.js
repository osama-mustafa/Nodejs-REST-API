const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/auth');
const isTokenBlacklisted = require('../middlewares/blacklistToken');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', authenticateUser, isTokenBlacklisted, createProduct);
router.get('/:id', getProduct);
router.put('/:id', authenticateUser, isTokenBlacklisted, updateProduct);
router.delete('/:id', authenticateUser, isTokenBlacklisted, deleteProduct);

module.exports = router;
