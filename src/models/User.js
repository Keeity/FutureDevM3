const { connection } = require('../database/connection') // se exportou dentro de objeto, tem que receber desestruturando
const { DataTypes } = require('sequelize') // aqui tu importa para fizer que vai buscar o sequelize.datatypes..
// const {hash} = require('bcryptjs')

const User = connection.define('user', {
    name:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    createdAt:DataTypes.DATE, // se só tem um, daí pode colocar sem chaves
    updatedAt: DataTypes.DATE
})

module.exports = User


