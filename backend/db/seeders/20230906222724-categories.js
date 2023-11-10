'use strict';
const { Category } = require('../models');
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
        id: 1,
        name: 'Dairy'
      },
      {
        id: 2,
        name: 'Beef'
      },
      {
        id: 3,
        name: 'Other'
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Categories';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Dairy', 'Beef', 'Other'] }
    }, {});
  }
};
