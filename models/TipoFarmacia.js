const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Definir el modelo de Tipo de Farmacia
const TipoFarmacia = sequelize.define('TipoFarmacia', {
  Id_Tipo_Farmacia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Descripcion: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'Tipo_Farmacia', // Nombre de la tabla en la base de datos
  timestamps: false          // Desactivar las columnas createdAt y updatedAt
});

module.exports = TipoFarmacia;
