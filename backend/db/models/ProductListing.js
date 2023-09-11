'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductListing extends Model {
    static associate(models) {
      ProductListing.hasMany(models.Review, { foreignKey: 'productId', onDelete: 'CASCADE', hooks: true });
      ProductListing.hasMany(models.ProductImage, { foreignKey: 'productId', onDelete: 'CASCADE', hooks: true });
      ProductListing.hasMany(models.Order, { foreignKey: 'productId', onDelete: 'CASCADE', hooks: true });
      ProductListing.hasOne(models.CartItem, { foreignKey: 'productId', onDelete: 'CASCADE', hooks: true });
      ProductListing.belongsTo(models.User, { foreignKey: 'userId' });

    }
  };

  ProductListing.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2,50]
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [2, 256],
        }
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      category: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "ProductListing",
      // defaultScope: {
      //   attributes: {
      //     exclude: ["createdAt", "updatedAt"]
      //   }
      // }
    }
  );
  return ProductListing;
};