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
        quantity: 1,
        userId: 1,
        categoryId: 1
      },
      {
        name: 'Marshmallow',
        description: "If you poke her side your finger'll sink right in",
        price: 998,
        quantity: 1,
        userId: 2,
        categoryId: 2
      },
      {
        name: 'Sugarplum',
        description: "For sale or trade. Will consider all offers.",
        price: 900,
        quantity: 1,
        userId: 3,
        categoryId: 1
      },
      {
        name: 'Peaches',
        description: 'I thought I was buying a bull but it turns out it was a cow. Reselling to get my money back.',
        price: 850,
        quantity: 1,
        userId: 4,
        categoryId: 1
      },
      {
        name: 'Tater Tot',
        description: "Smallest cow you've ever seen.",
        price: 1200,
        quantity: 1,
        userId: 5,
        categoryId: 3
      },
      {
        name: 'Snickerdoodle',
        description: "This girl makes the best home baked cookies you've ever had. You'll need a different cow for the milk to dip them in.",
        price: 800,
        quantity: 1,
        userId: 5,
        categoryId: 3
      },
      {
        name: 'Bubblegum',
        description: "This girl is blind in one eye and can be smelled across the field when she cuts the cheese. Please give her a good home where we can't smell her anymore",
        price: 50,
        quantity: 1,
        userId: 6,
        categoryId: 1
      },
      {
        name: 'Bonbon',
        description: 'Bonbon enjoys long walks on the beach and hanging out chewing the cud',
        price: 999,
        quantity: 1,
        userId: 7,
        categoryId: 1
      },
      {
        name: 'Daisy',
        description: "When Daisy loves, she loves hard. Make sure you're ready for her before you purchase.",
        price: 1000,
        quantity: 1,
        userId: 7,
        categoryId: 1
      },
      {
        name: 'Madame President',
        description: "You can't get any better than this 2,000 lb beauty. She'll be there to when you need guidance, when you need a hand, or when you're thirsty for some milk.",
        price: 2500,
        quantity: 1,
        userId: 7,
        categoryId: 1
      },
      {
        name: "Farmer Demo's Famous Cows",
        description: "Need a cow?",
        price: 1100,
        quantity: 3,
        userId: 1,
        categoryId: 2
      },
      {
        name: 'Moo',
        description: "It's a cow",
        price: 1111,
        quantity: 6,
        userId: 5,
        categoryId: 2
      },
      //13
      {
        name: 'Dairy cow',
        description: "Delicious milk",
        price: 1999,
        quantity: 5,
        userId: 5,
        categoryId: 1
      },
      {
        name: 'Popeye',
        description: "Biggest stud you'll ever find",
        price: 3999,
        quantity: 1,
        userId: 5,
        categoryId: 2
      },
      {
        name: 'Ferdinand',
        description: "The sweetest boy in the world. Free to good home.",
        price: 1,
        quantity: 1,
        userId: 5,
        categoryId: 3
      },
      {
        name: 'Good-Grass Farms Dairy Cows',
        description: "Good, well-bred cows, high producers",
        price: 999,
        quantity: 8,
        userId: 7,
        categoryId: 1
      },
      {
        name: 'Chuck',
        description: "Plenty to go around.",
        price: 1999,
        quantity: 3,
        userId: 4,
        categoryId: 2
      },
      {
        name: 'Big Beauty',
        description: "She's a lot to love.",
        price: 1599,
        quantity: 1,
        userId: 2,
        categoryId: 2
      },
      {
        name: 'Pookie',
        description: "Good, pet quality cows.",
        price: 599,
        quantity: 3,
        userId: 6,
        categoryId: 3
      }
      
      
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ProductListings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Sweetie Pie', 'Marshmallow', 'Sugarplum', 'Peaches', 'Tater Tot', 'Snickerdoodle', 'Bubblegum', 
      'Bonbon', 'Daisy', 'Madame President', "Farmer Demo's Famous Cows", 'Moo', 'Dairy cow', 'Popeye', 'Ferdinand', 
      'Good-Grass Farms Dairy Cows', 'Chuck', 'Big Beauty', 'Pookie'] }
    }, {});
  }
};
