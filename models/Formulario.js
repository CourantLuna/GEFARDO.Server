const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Definir el modelo de Formulario
const Formulario = sequelize.define('Formulario', {
  Id_Formulario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre_Formulario: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Creado_Por: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios', // Tabla de usuarios
      key: 'Id_Usuario'
    }
  },
  Modificado_Por: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Usuarios', // Tabla de usuarios
      key: 'Id_Usuario'
    }
  },
  Fecha_Creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  Fecha_Ultima_Modificacion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Campos_Formulario: {
    type: DataTypes.TEXT,
    allowNull: false // JSON que define la estructura del formulario
  },
  Estado: {
    type: DataTypes.BOOLEAN, // Usamos BOOLEAN para representar el tipo bit en BD
    allowNull: false,
    defaultValue: true // Puedes ajustar el valor predeterminado según la lógica
  }
}, {
  tableName: 'Formularios', // Nombre de la tabla en la base de datos
  timestamps: false         // Desactiva las columnas createdAt y updatedAt
});

module.exports = Formulario;

const Usuario = require('./Usuario'); // Asegúrate de importar el modelo Usuario

Formulario.belongsTo(Usuario, {
  foreignKey: 'Creado_Por',
  as: 'Creador', // Alias para la relación
});

Formulario.belongsTo(Usuario, {
  foreignKey: 'Modificado_Por',
  as: 'Modificador', // Alias para la relación
});
