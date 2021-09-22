const sequelize = require('../config/sequelize.config');
const DataTypes = require('sequelize');

module.exports = function () {
    return sequelize.define('usuarios', {
        Id: {
            type: DataTypes.INTEGER,
            field: 'Id',
            primaryKey: true,
            unique: true,
        },
        Rol_Id: {
            type: DataTypes.INTEGER,
            field: 'Rol_Id',
            foreignKey: true,
            unique: false,
        },
        Nombre: {
            type: DataTypes.STRING,
            field: 'Nombre'
        },
        Apellido: {
            type: DataTypes.STRING,
            field: 'Apellido'
        },
        Password: {
            type: DataTypes.STRING,
            field: 'Password'
        },
        Email: {
            type: DataTypes.STRING,
            field: 'Email'
        },
        Activo: {
            type: DataTypes.BOOLEAN,
            field: 'Activo'
        },

    }, {
        tableName: 'usuarios',
        timestamps: false
    });
};