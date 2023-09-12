'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.belongsTo(models.ProductListing, { foreignKey: 'productId' });
    }
  };

  Order.init(
    {
      quantity: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Order"
    }
  );
  return Order;
};