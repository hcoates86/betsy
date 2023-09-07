'use strict';

const { ProductImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ProductImage.bulkCreate([
      {
        url: 'https://ibb.co/QkRJ6yZ',
        productId: 1
      },
      {
        url: 'https://ibb.co/DCVtQMm',
        productId: 2
      },
      {
        url: 'https://ibb.co/Qjfj02j',
        productId: 3
      },
      {
        url: 'https://ibb.co/6J2CjD1',
        productId: 4
      },
      {
        url: 'https://ibb.co/qk9J8BV',
        productId: 5
      },
      {
        url: 'https://ibb.co/Y3QJBmF',
        productId: 6
      },
      {
        url: 'https://ibb.co/XJtqs2Y',
        productId: 7
      },
      {
        url: 'https://ibb.co/vsrDcxX',
        productId: 8
      },
      {
        url: 'https://ibb.co/FxxcwKB',
        productId: 9
      },
      {
        url: 'https://ibb.co/92JbprW',
        productId: 10
      },
      {
        url: 'https://ibb.co/ySST4WN',
        productId: 11
      },
      {
        url: 'https://ibb.co/ySST4WN',
        productId: 12
      }

      
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ProductImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      hashedPassword: { [Op.in]: ['password'] }
    }, {});
  }
};
