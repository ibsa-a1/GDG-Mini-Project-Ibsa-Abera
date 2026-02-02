const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: String,
    imageUrl: String
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);