const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Farmacias = require('./Farmacia'); // Importa el modelo relacionado

const Sanciones = sequelize.define('Sanciones', {
    ID_Sancion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ID_Farmacia: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Farmacias', // Nombre de la tabla relacionada
            key: 'Id_Farmacia',
        },
    },
    Fecha_Sancion: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    Detalle: {
        type: DataTypes.STRING(1),
        allowNull: true,
    },
    Multa: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: true,
    },
    Estado_Sancion: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
            isIn: [['Resuelta', 'Pendiente']], // Valida los estados permitidos
        },
    },
}, {
    tableName: 'Sanciones',
    timestamps: false,
});

// Relación con Farmacias
Sanciones.belongsTo(Farmacias, {
    foreignKey: 'ID_Farmacia',
    as: 'Farmacia',
});

module.exports = Sanciones;
