const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuario = require('./Usuario');
const Farmacia = require('./Farmacia');

// Definir el modelo de Inspección
const Inspeccion = sequelize.define('Inspeccion', {
  Id_Inspeccion: {
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
  Inspector: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios', // Nombre de la tabla Usuarios
      key: 'Id_Usuario'
    }
  },
  Fecha_Programada_Inspeccion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Fecha_Completada_Inspeccion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Tipo_Actividad: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Resultado: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  Firma_Responsable: {
    type: DataTypes.BLOB('long'),
    allowNull: true
  },
  Lista_Verificacion: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Listas_Verificacion', // Nombre de la tabla Listas_Verificacion
      key: 'Id_Lista'
    }
  },
  Estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
    allowNull: false,
  },
}, {
  tableName: 'Inspecciones', // Nombre de la tabla en la base de datos
  timestamps: false          // Desactiva las columnas createdAt y updatedAt
});
// Relaciones
Inspeccion.belongsTo(Farmacia, { foreignKey: 'Id_Farmacia', as: 'Farmacia' });
Inspeccion.belongsTo(Usuario, { foreignKey: 'Inspector', as: 'InspectorUsuario' });
module.exports = Inspeccion;



