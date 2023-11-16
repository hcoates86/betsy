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
      {
        url: 'https://i.ibb.co/ZJFqdJw/16.png',
        productId: 12
      },
      {
        url: 'https://i.ibb.co/zS3HpG3/15.png',
        productId: 13
      },
      {
        url: 'https://i.ibb.co/LrxDJ78/8.png',
        productId: 14
      },
      {
        url: 'https://i.ibb.co/3M82TVL/7.png',
        productId: 15
      },
      {
        url: 'https://i.ibb.co/k8LYZrB/14.png',
        productId: 16
      },
      {
        url: 'https://i.ibb.co/MnCVMKK/17.png',
        productId: 17
      },
      {
        url: 'https://i.ibb.co/vPBchvn/13.png',
        productId: 18
      },
      {
        url: 'https://i.ibb.co/kxwk1zg/6.png',
        productId: 19
      }
  
      
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
      'https://i.ibb.co/QddBDrJ/11.png',
      'https://i.ibb.co/ZJFqdJw/16.png',
      'https://i.ibb.co/zS3HpG3/15.png',
      'https://i.ibb.co/LrxDJ78/8.png',
      'https://i.ibb.co/3M82TVL/7.png',
      'https://i.ibb.co/k8LYZrB/14.png',
      'https://i.ibb.co/MnCVMKK/17.png',
      'https://i.ibb.co/vPBchvn/13.png',
      'https://i.ibb.co/kxwk1zg/6.png',
      ] }
    }, {});
  }
};
