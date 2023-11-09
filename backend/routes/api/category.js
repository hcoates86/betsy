const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');

const { Category, ProductListing } = require('../../db/models');

const router = express.Router();

//view all listings in a category
router.get('/:categoryId', async (req, res, next) => {
    const products = await ProductListing.findAll({ raw: true, where: { categoryId: req.params.categoryId }})

    const productArray = [];

    for (let product of products) {
        let avgStars;
        const currentProduct = await ProductListing.findByPk(product.id);
        const reviewTotal = await currentProduct.countReviews();

        const seller = await currentProduct.getUser({ attributes: ['id', 'username', 'picture']});

        if (!reviewTotal) avgStars = 0;
        else {
            const average = await Review.sum('stars', { where: { productId: product.id }});
            avgStars = average / reviewTotal;
            avgStars = Number.parseFloat(avgStars).toFixed(1);
        }

        let images = await currentProduct.getProductImages({ attributes: ['id', 'url'] })

        product.averageStars = avgStars;
        product.image = images;
        product.seller = seller;
        product.totalReviews = reviewTotal;

        productArray.push(product);
    }

    res.json(productArray)
})



module.exports = router;