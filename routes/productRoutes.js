const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const isTokenBlacklisted = require('../middlewares/blacklistToken');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', authMiddleware, isTokenBlacklisted, createProduct);
router.get('/:id', getProduct);
router.put('/:id', authMiddleware, isTokenBlacklisted, updateProduct);
router.delete('/:id', authMiddleware, isTokenBlacklisted, deleteProduct);

module.exports = router;
