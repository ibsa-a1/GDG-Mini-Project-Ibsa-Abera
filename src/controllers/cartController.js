const Cart = require('../models/cart');
const Product = require('../models/product');


const getCart = async () => {
    let cart = await Cart.findOne();
    if (!cart) cart = await Cart.create({ items: [] });
    return cart;
};


exports.viewCart = async (req, res) => {
    const cart = await getCart();
    await cart.populate('items.product');
    res.json(cart);
};


exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);


    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });


    const cart = await getCart();
    const item = cart.items.find(i => i.product.equals(productId));


    if (item) item.quantity += quantity;
    else cart.items.push({ product: productId, quantity });


    await cart.save();
    res.status(201).json(cart);
};

exports.updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;

    if (quantity < 1) {
        return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
    }

    const cart = await getCart();
    const item = cart.items.find(i => i.product.equals(productId));

    if (!item) {
        return res.status(404).json({ message: 'Product not in cart' });
    }

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
};


exports.removeFromCart = async (req, res) => {
    const cart = await getCart();
    cart.items = cart.items.filter(i => !i.product.equals(req.params.productId));
    await cart.save();
    res.json(cart);
};