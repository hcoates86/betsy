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
        picture:'https://ibb.co/S7jCfdJ',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        username: 'Bethy2',
        firstName: 'Elizabeth',
        lastName: 'Sanchez',
        picture:'https://ibb.co/d6hGz4M',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user3@user.io',
        username: 'RuthM',
        firstName: 'Ruth',
        lastName: 'Matthews',
        picture:'https://ibb.co/jb5PL20',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user4@user.io',
        username: 'Jess87',
        firstName: 'Jessica',
        lastName: 'Oneill',
        picture:'https://ibb.co/Sy87hq1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user5@user.io',
        username: 'Shannononon',
        firstName: 'Ethel',
        lastName: 'Shannon',
        picture:'https://ibb.co/x153PWf',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user6@user.io',
        username: 'Jaxjax',
        firstName: 'George',
        lastName: 'Middleton',
        picture:'https://ibb.co/SmynZdx',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user7@user.io',
        username: 'Margosha',
        firstName: 'Margaret',
        lastName: 'Roy',
        picture:'https://ibb.co/cYLZZcS',
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
