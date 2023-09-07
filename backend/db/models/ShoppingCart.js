'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    static associate(models) {
      // define association here
    }
  };

  ShoppingCart.init(
    {
      total: DataTypes.DECIMAL,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ShoppingCart",
      // defaultScope: {
      //   attributes: {
      //     exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      //   }
      // }
    }
  );
  return ShoppingCart;
};