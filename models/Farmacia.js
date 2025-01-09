const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Definir el modelo de Farmacia
const Farmacia = sequelize.define('Farmacia', {
  Id_Farmacia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Direccion: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  Id_Provincia: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Provincias', // Nombre de la tabla Provincias
      key: 'Id_Provincia'
    }
  },
  Id_Tipo_Farmacia: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Tipo_Farmacia', // Nombre de la tabla Tipo_Farmacia
      key: 'Id_Tipo_Farmacia'
    }
  },
  Responsable_Tecnico: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Usuarios', // Nombre de la tabla Usuarios
      key: 'Id_Usuario'
    }
  },
  Id_Clasificacion: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Clasificacion_Riesgo', // Tabla Clasificacion_Riesgo
      key: 'Id_Clasificacion'
    }
  },
  Tamano: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'Farmacias', // Nombre de la tabla en la base de datos
  timestamps: false       // Desactiva las columnas createdAt y updatedAt
});

module.exports = Farmacia;
