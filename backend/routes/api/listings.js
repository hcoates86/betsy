const express = require('express');
const bcrypt = require('bcryptjs');

const { ProductListing, ProductImage, Review, User } = require('../../db/models');

const router = express.Router();

//get all listings
router.get('/', async (req, res, next) => {

    
})

module.exports = router;