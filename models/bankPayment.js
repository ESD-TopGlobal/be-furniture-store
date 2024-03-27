'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BankPayment.init({
    bankName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BankPayment',
  });
  return BankPayment;
};