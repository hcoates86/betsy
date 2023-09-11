'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
      User.hasMany(models.ProductListing, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
      User.hasOne(models.ShoppingCart, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });

    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 35]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 35]
        }
      },
      picture: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      }
    }
  );
  return User;
};