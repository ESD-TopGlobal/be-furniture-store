'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(), // Use UUID v4 as default value
    },
    userId: DataTypes.INTEGER,
    bankPaymentId: DataTypes.INTEGER,
    vaNumber: DataTypes.STRING,
    priceTotal: DataTypes.INTEGER,
    status: DataTypes.STRING,
    notes: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};