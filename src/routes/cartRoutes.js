const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');


router.get('/', controller.viewCart);
router.post('/', controller.addToCart);
router.put('/', controller.updateCartItem);
router.delete('/:productId', controller.removeFromCart);


module.exports = router;