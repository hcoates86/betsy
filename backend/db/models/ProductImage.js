'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductImages extends Model {
    static associate(models) {
      // define association here
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