const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getMyOrders
} = require('../controllers/orderController');

const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// Only for customers
router.post('/', auth, checkRole('customer'), placeOrder);
router.get('/', auth, checkRole('customer'), getMyOrders);

module.exports = router;
