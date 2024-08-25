const { DataTypes } = require("sequelize")
const {connection} = require("../database/connection")
const Permission = require("./Permission")
const Role = require("./Role")

const PermissionRole = connection.define("permissionsRole", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    permissionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Permission,
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: { //coloca o model com o nome da tabela que quer fazer referência e a chave primária da referência)
            model: Role,
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        default: Date.now()
    },
    updatedAt: {
        type: DataTypes.DATE
    }
})

module.exports = PermissionRole