const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Inspecciones = require('./Inspeccion');


const Hallazgos = sequelize.define('Hallazgos', {
    Id_Hallazgo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Id_Inspeccion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Inspecciones', // Nombre de la tabla relacionada
            key: 'Id_Inspeccion',
        },
    },
    Descripcion_Norma: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    es_conforme: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    Causa: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Nivel_de_NC: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    Evidencias: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
    },
}, {
    tableName: 'Hallazgos',
    timestamps: false,
});

// Relación con Inspecciones

// Relación con Inspecciones
Hallazgos.belongsTo(Inspecciones, {
    foreignKey: 'Id_Inspeccion',
    as: 'Inspeccion',
});

module.exports = Hallazgos;
