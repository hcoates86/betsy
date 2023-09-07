'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    static associate(models) {
      ProductImage.belongsTo(models.ProductListing, { foreignKey: 'productId' })
    }
  };

  ProductImage.init(
    {
      url: DataTypes.STRING,
      productId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "ProductImage",
      // defaultScope: {
      //   attributes: {
      //     exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      //   }
      // }
    }
  );
  return ProductImage;
};