const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Farmacia = require('./Farmacia'); // Importa el modelo de Farmacia


// Definir el modelo de Sanción
const Sancion = sequelize.define('Sancion', {
  Id_Sancion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Id_Farmacia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Farmacias', // Referencia a la tabla Farmacias
      key: 'Id_Farmacia'
    }
  },
  Fecha_Sancion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Estado_Sancion: {
    type: DataTypes.ENUM('Pendiente', 'Resuelta'),
    allowNull: false
  },
  Detalle: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  Multa: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
}, {
  tableName: 'Sanciones', // Nombre de la tabla en la base de datos
  timestamps: false       // Desactivar las columnas createdAt y updatedAt
});

module.exports = Sancion;
// Relación: Una sanción pertenece a una farmacia
Sancion.belongsTo(Farmacia, { foreignKey: 'Id_Farmacia', as: 'Farmacia' });