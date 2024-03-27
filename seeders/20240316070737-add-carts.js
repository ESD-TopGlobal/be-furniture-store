'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Carts', [
      {
        "productId": 2,
        "userId": 1,
        "quantity": 10,
        "totalPrice": 34690000,
        "notes": "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "productId": 3,
        "userId": 2,
        "quantity": 2,
        "totalPrice": 4458000,
        "notes": "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "productId": 1,
        "userId": 1,
        "quantity": 2,
        "totalPrice": 3498000,
        "notes": "Carikan barang yang bagus",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "productId": 3,
        "userId": 2,
        "quantity": 1,
        "totalPrice": 2229000,
        "notes": "coba 1",
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
