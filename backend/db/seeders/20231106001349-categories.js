'use strict';
const { ProductListing } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Category.bulkCreate([
      {
        name: 'Dairy'
      },
      {
        name: 'Meat'
      },
      {
        name: 'Other'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Categories';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Dairy', 'Meat', 'Other'] }
    }, {});
  }
};
