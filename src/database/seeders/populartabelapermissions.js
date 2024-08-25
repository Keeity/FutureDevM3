'use strict';
const { queryInterface, Sequelize } = require("sequelize");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('permission',
      [
        {
            id: 1,
            description: 'listar_usuarios',
          createdAt: new Date('2024-08-25'),
          updatedAt: new Date('2024-08-25')
        },
        {
            id: 2,
            description: 'criar_usuario',
            createdAt: new Date('2024-08-25'),
            updatedAt: new Date('2024-08-25')
          },
          {
            id: 3,
            description: 'editar_usuario',
            createdAt: new Date('2024-08-25'),
            updatedAt: new Date('2024-08-25')
          },
          {
            id: 4,
            description: 'remover_usuario',
            createdAt: new Date('2024-08-25'),
            updatedAt: new Date('2024-08-25')
          }
      ]
    )
  }
}

down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('permission', {
    description: [
      'listar_usuarios',
      'criar_usuario',
      'editar_usuario',
      'remover_usuario',
    ]
  });
};