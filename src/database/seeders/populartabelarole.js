'use strict';
const { queryInterface, Sequelize } = require("sequelize");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('role',
      [
        {
          id: 1,
          description: 'admin',
          createdAt: new Date('2024-08-25'),
          updatedAt: new Date('2024-08-25')
        },
        {
          id: 2,
             description: 'user',
            createdAt: new Date('2024-08-25'),
            updatedAt: new Date('2024-08-25')
          },
          {
            id: 3,
            description: 'premium_user',
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