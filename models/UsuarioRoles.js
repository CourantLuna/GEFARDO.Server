const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Definir el modelo de Usuario_Roles
const UsuarioRoles = sequelize.define('UsuarioRoles', {
  Id_Usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios', // Tabla de usuarios
      key: 'Id_Usuario'
    },
    primaryKey: true
  },
  Id_Rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Roles', // Tabla de roles
      key: 'Id_Rol'
    },
    primaryKey: true
  }
}, {
  tableName: 'Usuario_Roles', // Nombre de la tabla en la base de datos
  timestamps: false           // Desactiva las columnas createdAt y updatedAt
});

module.exports = UsuarioRoles;
