'use strict';
const { queryInterface, Sequelize } = require("sequelize");
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users',
      [
        {
          name: 'Keeity Braga Collodel',
          email: 'keeity@example.com',
          password: bcrypt.hashSync('Keeity17', 8),
          createdAt: new Date('2024-05-05'),
          updatedAt: new Date('2024-05-05')
        },
        {
          name: 'João Silva',
          email: 'joao.silva@example.com',
          password: bcrypt.hashSync('Joao18', 8),
          createdAt: new Date('2024-05-05'),
          updatedAt: new Date('2024-05-05')
        },
        {
          name: 'Maria Santos',
          email: 'maria.santos@example.com',
          password: bcrypt.hashSync('Maria19', 8),
          createdAt: new Date('2024-05-05'),
          updatedAt: new Date('2024-05-05')
        },
        {
          name: 'Carlos Oliveira',
          email: 'carlos.oliveira@example.com',
          password: bcrypt.hashSync('Carlos20', 8),
          createdAt: new Date('2024-05-05'),
          updatedAt: new Date('2024-05-05')
        },
        {
          name: 'Anna Souza',
          email: 'anna.souza@example.com',
          password: bcrypt.hashSync('Anna21', 8),
          createdAt: new Date('2024-05-05'),
          updatedAt: new Date('2024-05-05')
        }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: [
        'keeity@example.com',
        'joao.silva@example.com',
        'maria.santos@example.com',
        'carlos.oliveira@example.com',
        'ana.souza@example.com'
      ]
    });
  }
};