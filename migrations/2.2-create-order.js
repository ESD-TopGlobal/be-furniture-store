'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID, // Use Sequelize.UUID instead of Sequelize.UUIDV4
        defaultValue: Sequelize.UUIDV4 // Set a default value to generate UUID v4
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      bankPaymentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BankPayments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      vaNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      priceTotal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      notes: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // await queryInterface.addIndex('Orders', ['userId'])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};