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
        "id": 1,
        "productId": 2,
        "quantity": 10,
        "totalPrice": 34690000,
        "notes": "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 2,
        "productId": 3,
        "quantity": 2,
        "totalPrice": 4458000,
        "notes": "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 3,
        "productId": 1,
        "quantity": 2,
        "totalPrice": 3498000,
        "notes": "Carikan barang yang bagus",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 4,
        "productId": 3,
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
