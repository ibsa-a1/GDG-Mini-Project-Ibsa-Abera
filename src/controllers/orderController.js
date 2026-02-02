const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');


exports.createOrder = async (req, res) => {
    const cart = await Cart.findOne().populate('items.product');
    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
    }


    let total = 0;
    for (const item of cart.items) {
        if (item.product.stock < item.quantity) {
            return res.status(400).json({ message: 'Stock issue detected' });
        }
        total += item.product.price * item.quantity;
        item.product.stock -= item.quantity;
        await item.product.save();
    }


    const order = await Order.create({
        items: cart.items,
        total,
        customerInfo: req.body.customerInfo || {}
    });


    cart.items = [];
    await cart.save();


    res.status(201).json(order);
};


exports.getOrders = async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
};


exports.getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
};