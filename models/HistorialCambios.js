const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Definir el modelo de Historial de Cambios
const HistorialCambio = sequelize.define('HistorialCambio', {
  Id_Cambio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre_Tabla: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Id_Registro: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Campo_Modificado: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Valor_Anterior: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Valor_Nuevo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Fecha_Hora_Cambio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  Realizado_Por: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios', // Referencia a la tabla Usuarios
      key: 'Id_Usuario'
    }
  },
  Razon_Cambio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Estado: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  IP_Origen: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'Historial_Cambios', // Nombre de la tabla en la base de datos
  timestamps: false              // Desactiva las columnas createdAt y updatedAt
});

module.exports = HistorialCambio;
