'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // define association here
    }
  };

  Review.init(
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [2, 256],
        }
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Review",
      // defaultScope: {
      //   attributes: {
      //     exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      //   }
      // }
    }
  );
  return Review;
};