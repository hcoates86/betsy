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
        url: 'https://i.ibb.co/xY02Mxy/1.png',
        productId: 1
      },
      {
        url: 'https://i.ibb.co/T8vkt0J/2.png',
        productId: 2
      },
      {
        url: 'https://i.ibb.co/G303mK3/3.png',
        productId: 3
      },
      {
        url: 'https://i.ibb.co/vvbn0LQ/4.png',
        productId: 4
      },
      {
        url: 'https://i.ibb.co/nzfPyrt/5.png',
        productId: 5
      },
      {
        url: 'https://i.ibb.co/47tCRzn/6.png',
        productId: 6
      },
      {
        url: 'https://i.ibb.co/RhM7gpj/7.png',
        productId: 7
      },
      {
        url: 'https://i.ibb.co/f11Zp2C/8.png',
        productId: 8
      },
      {
        url: 'https://i.ibb.co/MpbcgC7/9.png',
        productId: 9
      },
      {
        url: 'https://i.ibb.co/MN7mV2B/10.png',
        productId: 10
      },
      {
        url: 'https://i.ibb.co/QddBDrJ/11.png',
        productId: 11
      },
  
      
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ProductImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
      'https://i.ibb.co/xY02Mxy/1.png',
      'https://i.ibb.co/T8vkt0J/2.png',
      'https://i.ibb.co/G303mK3/3.png',
      'https://i.ibb.co/vvbn0LQ/4.png',
      'https://i.ibb.co/nzfPyrt/5.png',
      'https://i.ibb.co/47tCRzn/6.png',
      'https://i.ibb.co/RhM7gpj/7.png',
      'https://i.ibb.co/f11Zp2C/8.png',
      'https://i.ibb.co/MpbcgC7/9.png',
      'https://i.ibb.co/MN7mV2B/10.png',
      'https://i.ibb.co/QddBDrJ/11.png'

      ] }
    }, {});
  }
};
