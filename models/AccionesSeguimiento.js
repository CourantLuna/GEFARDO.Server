const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const AccionesSeguimiento = sequelize.define('AccionesSeguimiento', {
    Id_Accion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Id_Inspeccion: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Responsable: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Descripcion_Accion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Fecha_Programada: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    Estado: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            isIn: [['cancelado', 'listo', 'en curso', 'pendiente']],
        },
    },
    Fecha_Ejecutada: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
}, {
    tableName: 'Acciones_Seguimiento',
    timestamps: false,
});

// Relaciones
const Inspecciones = require('./Inspeccion');
const Usuarios = require('./Usuario');

AccionesSeguimiento.belongsTo(Inspecciones, {
    foreignKey: 'Id_Inspeccion',
    as: 'Inspeccion',
});

AccionesSeguimiento.belongsTo(Usuarios, {
    foreignKey: 'Responsable',
    as: 'ResponsableUsuario',
});

module.exports = AccionesSeguimiento;
