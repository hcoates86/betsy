'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
        CartItem.belongsTo(models.ShoppingCart, { foreignKey: 'shoppingCartId' })
        CartItem.belongsTo(models.ProductListing, { foreignKey: 'productId' })
    }
  };

  CartItem.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: DataTypes.INTEGER,
      shoppingCartId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CartItem",
      // defaultScope: {
      //   attributes: {
      //     exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      //   }
      // }
    }
  );
  return CartItem;
};