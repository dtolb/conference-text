'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MESSAGEs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bandwidth_message_id: {
        type: Sequelize.STRING
      },
      api_resposne: {
        type: Sequelize.JSONB
      },
      failed: {
        type: Sequelize.BOOLEAN
      },
      date: {
        type: Sequelize.DATE
      },
      incoming_callback: {
        type: Sequelize.JSONB
      },
      delivered_callback: {
        type: Sequelize.JSONB
      },
      failed_callback: {
        type: Sequelize.JSONB
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MESSAGEs');
  }
};