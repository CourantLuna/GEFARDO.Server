const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuarios = require('../models/Usuario'); // Modelo Usuarios
const Roles = require('../models/Rol'); // Modelo Roles

const UsuarioRoles = sequelize.define('UsuarioRoles', {
    Id_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios', // Nombre de la tabla Usuarios
            key: 'Id_Usuario',
        },
        primaryKey: true,
    },
    Id_Rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Roles', // Nombre de la tabla Roles
            key: 'Id_Rol',
        },
        primaryKey: true,
    },
}, {
    tableName: 'Usuario_Roles', // Asegúrate de que este es el nombre correcto de la tabla en SQL
    timestamps: false, // Desactiva createdAt y updatedAt
});

// Configurar relaciones
UsuarioRoles.belongsTo(Usuarios, { foreignKey: 'Id_Usuario' });
UsuarioRoles.belongsTo(Roles, { foreignKey: 'Id_Rol' });

module.exports = UsuarioRoles;
