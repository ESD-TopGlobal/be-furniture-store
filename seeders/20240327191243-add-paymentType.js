'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('BankPayments', [
      {
        bankName: 'bri',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bankName: 'mandiri',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bankName: 'bni',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bankName: 'bca',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bankName: 'permata',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};