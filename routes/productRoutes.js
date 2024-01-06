const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const isTokenBlacklisted = require('../middlewares/blacklistToken');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const uploadImageMiddleware = require('../middlewares/uploadImageMiddleware');

router.get('/', getProducts);
router.post('/',
    authenticationMiddleware,
    isTokenBlacklisted,
    uploadImageMiddleware.single('file'),
    createProduct);
router.get('/:id', getProduct);
router.put('/:id', authenticationMiddleware, isTokenBlacklisted, updateProduct);
router.delete('/:id', authenticationMiddleware, isTokenBlacklisted, deleteProduct);

module.exports = router;
