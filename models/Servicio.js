const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Definir el modelo de Servicio
const Servicio = sequelize.define('Servicio', {
  Id_Servicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Id_Tipo_Servicio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Tipo_Servicio', // Tabla de tipo de servicios
      key: 'Id_Tipo_Servicio'
    }
  },
  Id_Solicitante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios', // Tabla de usuarios
      key: 'Id_Usuario'
    }
  },
  Id_Farmacia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Farmacias', // Tabla de farmacias
      key: 'Id_Farmacia'
    }
  },
  Datos_Formulario: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Id_Estado_Actual: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Flujo_Estados_Servicio', // Tabla de estados de servicio
      key: 'Id_Estado_Servicio'
    }
  },
  Fecha_Solicitud: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  Fecha_Cierre: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Descripcion: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  Atendido_Por: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Usuarios', // Tabla de usuarios
      key: 'Id_Usuario'
    }
  }
}, {
  tableName: 'Servicios', // Nombre de la tabla en la base de datos
  timestamps: false        // Desactiva las columnas createdAt y updatedAt
});

module.exports = Servicio;
