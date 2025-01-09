const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Definir el modelo de Licencia
const Licencia = sequelize.define('Licencia', {
  Id_Licencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Id_Farmacia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Farmacias', // Nombre de la tabla Farmacias
      key: 'Id_Farmacia'
    }
  },
  Numero_Licencia: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  Fecha_Emision: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Fecha_Vencimiento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Estado_Licencia: {
    type: DataTypes.ENUM('Activa', 'Suspendida', 'Expirada'),
    allowNull: false
  }
}, {
  tableName: 'Licencias', // Nombre de la tabla en la base de datos
  timestamps: false       // Desactiva las columnas createdAt y updatedAt
});

module.exports = Licencia;
