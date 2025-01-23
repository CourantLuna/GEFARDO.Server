const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Formulario = require('./Formulario');

// Definir el modelo de Tipo de Servicio
const TipoServicio = sequelize.define('TipoServicio', {
  Id_Tipo_Servicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre_Servicio: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Id_Formulario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Formularios', // Nombre de la tabla Formularios
      key: 'Id_Formulario'
    }
  },
  Descripcion: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  Estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
    allowNull: false,
  },
}, {
  tableName: 'Tipo_Servicio', // Nombre de la tabla en la base de datos
  timestamps: false           // Desactiva las columnas createdAt y updatedAt
});
TipoServicio.belongsTo(Formulario, {
  foreignKey: 'Id_Formulario',
  as: 'Formulario', // Alias para la relación
});
module.exports = TipoServicio;
