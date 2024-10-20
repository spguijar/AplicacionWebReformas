'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      provincia: {
        type: Sequelize.STRING
      }
    });
    queryInterface.bulkInsert()('Clientes'), [{
      nombre: 'sandra',
      email: 'sandra_seempree@hotmail.com',
      password: '123456',
      direccion: "C/Pifano Nº1 3ºA",
      provincia: "Valladolid"
    }]
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clientes');
  }
};