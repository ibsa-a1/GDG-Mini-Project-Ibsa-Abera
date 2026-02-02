const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, min: 1 }
        }
    ]
});


module.exports = mongoose.model('Cart', cartSchema);