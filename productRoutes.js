const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// Public Route
router.get('/', getAllProducts);

// Admin Routes (JWT protected + role check)
router.post('/', auth, checkRole('admin'), createProduct);
router.put('/:id', auth, checkRole('admin'), updateProduct);
router.delete('/:id', auth, checkRole('admin'), deleteProduct);

module.exports = router;
