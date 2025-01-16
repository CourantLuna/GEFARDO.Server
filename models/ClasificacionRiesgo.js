// Modelo: Clasificacion_Riesgo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ClasificacionRiesgo = sequelize.define('ClasificacionRiesgo', {
    Id_Clasificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nivel_Riesgo: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    tableName: 'Clasificacion_Riesgo',
    timestamps: false, // No agregar columnas createdAt y updatedAt
});

module.exports = ClasificacionRiesgo;