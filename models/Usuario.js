const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Usuario = sequelize.define('Usuario', {
  Id_Usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Cedula: {
    type: DataTypes.STRING(11), // Nuevo campo Cedula
    allowNull: false,
    unique: true,              // Asegura que no haya duplicados
  },
  Nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Apellido: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Correo_Electronico: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  Clave: {
    type: DataTypes.STRING(255),
    allowNull: false, // Se recomienda cifrar las contraseñas
  },
  Estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'Usuarios', // Nombre de la tabla en la base de datos
  timestamps: false      // Desactiva las columnas createdAt y updatedAt
});

module.exports = Usuario;
