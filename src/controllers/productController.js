const Product = require('../models/product');


exports.getProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice } = req.query;
        const filter = {};

        if (category) filter.category = category;

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const products = await Product.find(filter);
        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid Data sent!',
        });
    }
};


exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid Data sent!',
        });
    }
};


exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid Data sent!',
        });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid Data sent!',
        });
    }
};


exports.deleteProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(204).json({
        status: 'success',
        data: null,
        message: 'Product deleted'
    });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid Data sent!',
        });
    }
};