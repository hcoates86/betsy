'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.ProductListing, { foreignKey: 'productId' });
      Review.belongsTo(models.User, { foreignKey: 'userId' });
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