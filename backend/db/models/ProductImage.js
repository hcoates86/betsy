'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductImages extends Model {
    static associate(models) {
      ProductImages.belongsTo(models.ProductListing, { foreignKey: 'productId' })
    }
  };

  ProductImages.init(
    {
      url: DataTypes.STRING,
      productId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "ProductImages",
      // defaultScope: {
      //   attributes: {
      //     exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      //   }
      // }
    }
  );
  return ProductImages;
};