const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');

const { Category } = require('../../db/models');

const router = express.Router();

//view all listings in a category
router.get('/:categoryId', async (req, res, next) => {
    const catResults = await Category.findAll({ raw: true, where: { categoryId: req.params.categoryId }})

 

    res.json(catResults)
})



module.exports = router;