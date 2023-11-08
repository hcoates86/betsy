const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');

const { ProductListing, ProductImage, Review, User, CartItem, ShoppingCart } = require('../../db/models');

const router = express.Router();

//show cart with cart items inside
router.get('/', async (req, res, next) => {
    //grab logged in user and get their cart
    const user = await User.findByPk(req.user.id);
    const cart = await user.getShoppingCart();
    const cartItems = await cart.getCartItems();

    res.json(cartItems)


})

//add to cart
router.post('/:productId', async (req, res, next) => {
    const { quantity } = req.body;

    const user = await User.findByPk(req.user.id);
    let cart = await user.getShoppingCart();
    if (!cart) {
        cart = await ShoppingCart.create({
            userId: user.id
        }) 
    }

    const newCartItem = await CartItem.create({
        quantity,
        productId: req.params.productId,
        shoppingCartId: cart.id
    })
    res.status(201)
    res.json(newCartItem)

})

//edit quantity in cart
router.put('/:productId', async (req, res, next) => {
    const { quantity } = req.body;
    const cartItem = await CartItem.findByPk(req.params.productId);
    const listing = await cartItem.getProductListing();
    const err = new Error("Insufficient quantity remaining");
    err.status = 400;

    if (+quantity > listing.quantity) next(err);


    cartItem.set({ quantity })
    await cartItem.save()
    res.json(cartItem)


})


module.exports = router;