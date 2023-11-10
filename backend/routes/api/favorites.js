const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');

const { Category, ProductListing, User } = require('../../db/models');

const router = express.Router();

//view user's favorites
router.get('/:userId', async (req, res, next) => {
    
})

//add to favorites
router.post('/:productId', async (req, res, next) => {
    
})

//remove from favorites
router.delete('/:productId', async (req, res, next) => {
    
})


module.exports = router;