const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

// Definir el modelo de Provincia
const Provincia = sequelize.define('Provincia', {
  Id_Provincia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Descripcion: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
    allowNull: false,
  },
}, {
  tableName: 'Provincias',  // Nombre de la tabla en la base de datos
  timestamps: false,  // Desactivar las columnas createdAt y updatedAt si no las necesitas
});

module.exports = Provincia;
