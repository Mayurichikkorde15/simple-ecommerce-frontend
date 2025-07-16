const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Place an order from cart
exports.placeOrder = async (req, res) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    }));

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const order = new Order({
      user: userId,
      items: orderItems,
      totalAmount
    });

    await order.save();

    // Clear the cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', order });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all orders for customer
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
