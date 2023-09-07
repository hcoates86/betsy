'use strict';

const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        comment: 'This cow is now my best friend',
        stars: 5,
        userId: ,
        productId: 
      },
      {
        comment: 'makes the best milk',
        stars: 5,
        userId: ,
        productId: 
      },
      {
        comment: 'A++++ would buy again!!!!',
        stars: 5,
        userId: ,
        productId: 
      },
      {
        comment: 'Cow never showed up. Disappointed',
        stars: 1,
        userId: ,
        productId: 
      },
      {
        comment: 'I thought I was buying a sheep',
        stars: 3,
        userId: ,
        productId: 
      },
      {
        comment: 'I was delivered two identical cows and had to shoot the evil one',
        stars: 1,
        userId: ,
        productId: 
      },
      {
        comment: 'Very tasty milk',
        stars: 4,
        userId: ,
        productId: 
      }
      
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      hashedPassword: { [Op.in]: ['password'] }
    }, {});
  }
};
