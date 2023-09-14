const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');

const { Review } = require('../../db/models');

const router = express.Router();

const properAuth = async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    if (review.userId !== req.user.id) {
        const err = new Error("Review must belong to the current user");
        err.title = "Permission denied";
        err.status = 401;
        next(err)
    } 
      next()
  }

//edit review
router.put('/:reviewId', requireAuth, properAuth, async (req, res, next) => {
    const { comment, stars } = req.body;
    const currReview = await Review.findByPk(req.params.reviewId);

    //check if it works
    // const errors = {};
    // const err = new Error("Validation Error");
    // err.title = "Body validation error";
    // err.status = 400;
    // if (!comment) errors['comment'] = "Review text is required";
    // if (!stars || typeof stars !== 'number' || stars < 1 || stars > 5) errors['stars'] = "Stars must be a number from 1 to 5";
    // if (Object.keys(errors).length) {
    //     err.errors = errors;
    //     next(err)
    // }

    await currReview.set({ comment, stars })
    await currReview.save()

    res.json(currReview)
})

router.delete('/:reviewId', requireAuth, properAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    await review.destroy()
    res.status(200)
    res.json("Successfully deleted")
})


module.exports = router;