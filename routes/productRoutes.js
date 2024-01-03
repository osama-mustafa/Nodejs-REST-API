const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/auth');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');



router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', authenticateUser, createProduct);
router.put('/:id', authenticateUser, updateProduct);
router.delete('/:id', authenticateUser, deleteProduct);

module.exports = router;
