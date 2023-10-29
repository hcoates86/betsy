const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');

const { ProductListing, ProductImage, Review, User, CartItem, ShoppingCart } = require('../../db/models');

const router = express.Router();

const cartValidations = async (req, res, next) => {

}

//show cart with cart items inside
router.get('/', async (req, res, next) => {
    //grab logged in user
    const user = await User.findByPk(req.user.id);
    const cart = await user.getShoppingCart();
    const cartItems = await cart.getCartItems();

    res.json(cartItems)


})

//add to cart
router.post('/:productId', async (req, res, next) => {
    const { quantity } = req.body;

    const user = await User.findByPk(req.user.id);
    const cart = await user.getShoppingCart();

    const newCartItem = await CartItem.create({
        quantity,
        productId: req.params.productId,
        shoppingCartId: cart.id
    })

    res.json(newCartItem)

})


module.exports = router;