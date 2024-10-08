'use strict';
const {
  Model
} = require('sequelize');

const { User, Product } = require('../models')

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cart',
  });
  
  return Cart;
};