const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');

const { ProductListing, ProductImage, Review, User } = require('../../db/models');

const router = express.Router();

//update review by id

//delete review by id




module.exports = router;