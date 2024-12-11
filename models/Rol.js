const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Definir el modelo de Rol
const Rol = sequelize.define('Rol', {
  Rol_Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Nombre_Rol: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Nivel: {
    type: DataTypes.CHAR(1),  // Usamos CHAR(1) para 'A', 'M', 'B'
    allowNull: false,
  }
}, {
  tableName: 'Roles',  // Nombre de la tabla en la base de datos
  timestamps: false,   // Desactivar createdAt y updatedAt si no las necesitas
});

module.exports = Rol;
