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
    await ProductListing.bulkCreate([
      {
        name: 'Sweetie Pie',
        description: "Her name is accurate, this is the sweetest cow you'll ever meet. Sad we have to part ways but c'est la vie",
        price: 966,
        userId: 1
      },
      {
        name: 'Marshmallow',
        description: "If you poke her side your finger'll sink right in",
        price: 998,
        userId: 2
      },
      {
        name: 'Sugarplum',
        description: "For sale or trade. Will consider all offers.",
        price: 900,
        userId: 3
      },
      {
        name: 'Peaches',
        description: 'I thought I was buying a bull but it turns out it was a cow. Reselling to get my money back.',
        price: 850,
        userId: 4
      },
      {
        name: 'Tater Tot',
        description: "Smallest cow you've ever seen.",
        price: 1200,
        userId: 5
      },
      {
        name: 'Snickerdoodle',
        description: "This girl makes the best home baked cookies you've ever had. You'll need a different cow for the milk to dip them in.",
        price: 800,
        userId: 5
      },
      {
        name: 'Bubblegum',
        description: "This girl is blind in one eye and can be smelled across the field when she cuts the cheese. Please give her a good home where we can't smell her anymore",
        price: 50,
        userId: 6
      },
      {
        name: 'Bonbon',
        description: 'Bonbon enjoys long walks on the beach and hanging out chewing the cud',
        price: 999,
        userId: 7
      },
      {
        name: 'Daisy',
        description: "When Daisy loves, she loves hard. Make sure you're ready for her before you purchase.",
        price: 1000,
        userId: 7
      },
      {
        name: 'Madame President',
        description: "You can't get any better than this 2,000 lb beauty. She'll be there to when you need guidance, when you need a hand, or when you're thirsty for some milk.",
        price: 2500,
        userId: 7
      },
      {
        name: 'Cupcake',
        description: "Need a cow?",
        price: 1100,
        userId: 1
      },
      {
        name: 'Moo',
        description: "It's a cow",
        price: 1111,
        userId: 5
      }
      
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ProductListings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Sweetie Pie', 'Marshmallow', 'Sugarplum', 'Peaches', 'Tater Tot', 'Snickerdoodle', 'Bubblegum', 
      'Bonbon', 'Daisy', 'Madame President', 'Cupcake', 'Moo'] }
    }, {});
  }
};
