const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const isTokenBlacklisted = require('../middlewares/blacklistToken');
const uploadImageMiddleware = require('../middlewares/uploadImageMiddleware');
const createProductValidator = require('../utils/validators/productValidator');

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.get('/', getProducts);

router.post('/', [
    authenticationMiddleware,
    isTokenBlacklisted,
    // createProductValidator,
    uploadImageMiddleware.single('file'),
    createProduct
]);

router.get('/:id', getProduct);

router.put('/:id', [
    authenticationMiddleware,
    isTokenBlacklisted,
    updateProduct
]);

router.delete('/:id', [
    authenticationMiddleware,
    isTokenBlacklisted,
    deleteProduct
]);

module.exports = router;
