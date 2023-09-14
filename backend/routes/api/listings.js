const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { ProductListing, ProductImage, Review, User } = require('../../db/models');

const router = express.Router();

const properAuth = async (req, res, next) => {
    const error = new Error("Product Listing does not belong to the current user");
    const listing = await ProductListing.findByPk(req.params.productId);
    error.status = 401;
    error.title = "Permission denied"
    if (req.user.id !== listing.userId) next(error)
    else next()

}


//get all listings
router.get('/', async (req, res, next) => {
    const products = await ProductListing.findAll({raw: true})
    const productArray = [];
   
    for (let product of products) {
        let avgStars;
        const currentProduct = await ProductListing.findByPk(product.id);
        const reviewTotal = await currentProduct.countReviews();

        const seller = await currentProduct.getUser();

        const sellerListings = await seller.getProductListings();
        console.log(sellerListings);

         // let totalReviews = 0;
    // let totalStars = 0;

        // sellerListings.map(async listing => {
        //     const sellerReviews = await listing.countReviews();
        //     const reviewStars = await Review.sum('stars', { where: { productId: listing.id }});
        //     totalStars += reviewStars;
        //     totalReviews += sellerReviews;
        // })


        if (!reviewTotal) avgStars = 0;
        else {
            const average = await Review.sum('stars', { where: { productId: product.id }});
            avgStars = average / reviewTotal;
            avgStars = Number.parseFloat(avgStars).toFixed(1);
        }
        //gets all images in an array of objects
        let images = await currentProduct.getProductImages({ attributes: ['id', 'url'] })

        product.averageStars = avgStars
        product.image = images
        product.seller = seller;
        product.totalReviews = reviewTotal;
        // product.totalReviews = totalReviews

        productArray.push(product);
    }
    res.json(productArray)

})


//post a new product listing
router.post('/new', requireAuth, async (req, res, next) => {
    //implement posting category later
    const { name, description, price, quantity } = req.body;

    const newProduct = await ProductListing.create({
        userId: req.user.id,
        name, description, price, quantity
    })
    res.status(201)
    res.json(newProduct)
})

//edit product
router.put('/:productId', requireAuth, properAuth, async (req, res, next) => {
    const { name, description, price, quantity } = req.body;

    const listing = ProductListing.findByPk(req.params.productId);
    listing.set({
        name, description, price, quantity
    });
    await listing.save();
    res.json(listing);

})


//get single product listing
router.get('/:productId',  async (req, res, next) => {
    const id = req.params.productId;
    const listing = await ProductListing.findByPk(id);

    const images = await listing.getProductImages({ attributes: ['id', 'url']})
    const poster = await listing.getUser({ attributes: ['id', 'username', 'picture']})

    const totalReviews = await listing.countReviews();
    const totalStars = await Review.sum('stars', { where: { productId: id }})
    const averageStars = totalStars / totalReviews;


    const newListing = {
        ...listing.dataValues,
        totalReviews,
        averageStars,
        images,
        postedBy: poster
    }

    res.json(newListing)

})

router.delete('/:productId', requireAuth, properAuth, async (req, res, next) => {
    const listing = await ProductListing.findByPk(req.params.productId);
    await listing.destroy()
    res.status(200)
    res.json("Deleted Product Listing")
})

//post image to a specific listing
router.post('/:productId/images', requireAuth, properAuth, async (req, res, next) => {
    const { url } = req.body;

    const newImage = await ProductImage.create({
        url,
        productId: req.params.productId
    })

    res.json(newImage)
})


//get all reviews for a specific listing
router.get('/:productId/reviews', async (req, res, next) => {
  
    const listing = await ProductListing.findByPk(req.params.productId);
    const reviews = await listing.getReviews({ raw: true });

    const reviewArray = [];

    for (let review of reviews) {
        review.user = await User.findByPk(review.userId, {attributes: ['username', 'picture']})

        reviewArray.push(review)
    }

    res.json(reviewArray)


})

//get all reviews for a user's listings

//post review to a specific listing
router.post('/:productId/reviews', requireAuth, properAuth, async (req, res, next) => {
    const { comment, stars } = req.body

    const newReview = Review.create({
        comment, stars,
        userId: req.user.id,
        productId: req.params.productId
    })

    res.json(newReview)

})




module.exports = router;