const Product = require('../models/Product');

// Public: Get all products (with optional search/pagination)
exports.getAllProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 5 } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Add product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin: Update product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated', updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
