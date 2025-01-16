// Modelo: Flujo_Estados_Servicio.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const TipoServicio = require('./TipoServicio');

const FlujoEstadosServicio = sequelize.define('FlujoEstadosServicio', {
    Id_Estado_Servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Id_Tipo_Servicio: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: TipoServicio,
            key: 'Id_Tipo_Servicio',
        },
    },
    Nombre_Estado: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Orden: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Flujo_Estados_Servicio',
    timestamps: false, // No agregar columnas createdAt y updatedAt
});

FlujoEstadosServicio.belongsTo(TipoServicio, {
    foreignKey: 'Id_Tipo_Servicio',
    as: 'TipoServicio',
});

module.exports = FlujoEstadosServicio;