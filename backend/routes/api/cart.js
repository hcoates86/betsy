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

    const cartArray = [];

    if (!cart) {
        cart = await ShoppingCart.create({
            userId: user.id
        }) 
    }
    const cartItems = await cart.getCartItems({raw: true});

    for (let item of cartItems) {
        const itemListing = await ProductListing.findByPk(item.productId)
        let images = await itemListing.getProductImages({ attributes: ['id', 'url'] })
        const seller = await itemListing.getUser({ attributes: ['id', 'username', 'picture']});

        item.price = itemListing.price
        item.name = itemListing.name;
        //have to check quantity against total for possible error
        item.totalQuantity = itemListing.quantity;
        item.seller = seller;
        item.image = images;

        cartArray.push(item)
    }

    res.json(cartArray)
})

//add to cart
router.post('/:productId', async (req, res, next) => {
    const { quantity } = req.body;

    const user = await User.findByPk(req.user.id);
    let cart = await user.getShoppingCart();
    //if user doesn't have a cart, create one
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
    
    if (newCartItem.id) {
        const newCartItem2 = {...newCartItem}
        const itemListing = await ProductListing.findByPk(newCartItem.productId)
        let images = await itemListing.getProductImages({ attributes: ['id', 'url'] })
        const seller = await itemListing.getUser({ attributes: ['id', 'username', 'picture']});

        newCartItem2.price = itemListing.price
        newCartItem2.name = itemListing.name;
        newCartItem2.totalQuantity = itemListing.quantity;
        newCartItem2.seller = seller;
        newCartItem2.image = images;


        res.status(201)
        res.json(newCartItem2)
    }

})

//edit quantity in cart
router.put('/:cartId', async (req, res, next) => {
    const { quantity } = req.body;
    const cartItem = await CartItem.findByPk(req.params.cartId);
    const listing = await cartItem.getProductListing();
    const err = new Error("Insufficient quantity remaining");
    err.status = 400;

    if (+quantity > listing.quantity) next(err);


    cartItem.set({ quantity })
    await cartItem.save()
    res.json(cartItem)


})

//delete item from cart
router.delete('/:cartId', async (req, res, next) => {
    const cartItem = await CartItem.findByPk(req.params.cartId);
    await cartItem.destroy();
    res.status(200)
    res.json("Removed item from cart")
})

module.exports = router;