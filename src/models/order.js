const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    items: Array,
    total: Number,
    customerInfo: Object,
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', orderSchema);