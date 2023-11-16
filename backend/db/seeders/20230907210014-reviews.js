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
        userId: 1,
        productId: 12
      },
      {
        comment: 'makes the best milk',
        stars: 5,
        userId: 2,
        productId: 11
      },
      {
        comment: 'A++++ would buy again!!!!',
        stars: 5,
        userId: 2,
        productId: 10
      },
      {
        comment: 'Cow never showed up. Disappointed',
        stars: 1,
        userId: 3,
        productId: 9
      },
      {
        comment: 'I thought I was buying a sheep',
        stars: 3,
        userId: 4,
        productId: 8
      },
      {
        comment: 'I was delivered two identical cows and had to shoot the evil one',
        stars: 1,
        userId: 4,
        productId: 7
      },
      {
        comment: 'Very tasty milk',
        stars: 4,
        userId: 1,
        productId: 6
      },
      {
        comment: "Best cow I've ever met",
        stars: 5,
        userId: 2,
        productId: 12
      },
      {
        comment: 'Beautiful cows, would recommend!',
        stars: 5,
        userId: 4,
        productId: 19
      },
      {
        comment: "Average, but that's not a bad thing",
        stars: 3,
        userId: 3,
        productId: 18
      },
      {
        comment: 'Great! Amazing!!!! Love it!',
        stars: 4,
        userId: 4,
        productId: 3
      }
      
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
