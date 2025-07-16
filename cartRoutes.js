const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart
} = require('../controllers/cartController');

const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// Only logged-in customers
router.get('/', auth, checkRole('customer'), getCart);
router.post('/add', auth, checkRole('customer'), addToCart);
router.delete('/remove', auth, checkRole('customer'), removeFromCart);

module.exports = router;
