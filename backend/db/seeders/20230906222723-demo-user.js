'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'Lition',
        picture:'https://i.ibb.co/XkQRY3V/1.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        username: 'Bethy2',
        firstName: 'Elizabeth',
        lastName: 'Sanchez',
        picture:'https://i.ibb.co/ftc4PdF/2.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user3@user.io',
        username: 'RuthM',
        firstName: 'Ruth',
        lastName: 'Matthews',
        picture:'https://i.ibb.co/ZGJphP4/3.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user4@user.io',
        username: 'Jess87',
        firstName: 'Jessica',
        lastName: 'Oneill',
        picture:'https://i.ibb.co/B3xKX87/4.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user5@user.io',
        username: 'Shannononon',
        firstName: 'Ethel',
        lastName: 'Shannon',
        picture:'https://i.ibb.co/6HsNVz1/5.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user6@user.io',
        username: 'Jaxjax',
        firstName: 'George',
        lastName: 'Middleton',
        picture:'https://i.ibb.co/ZgX8bYJ/6.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user7@user.io',
        username: 'Margosha',
        firstName: 'Margaret',
        lastName: 'Roy',
        picture:'https://i.ibb.co/6XBTTR7/7.png',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.like]: ['%@user.io'] }
    }, {});
  }
};
