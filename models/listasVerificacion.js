// Modelo: Listas_Verificacion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuarios = require('./Usuario'); // Asegúrate de importar el modelo Usuarios

const ListasVerificacion = sequelize.define('ListasVerificacion', {
    Id_Lista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Descripcion: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    Fecha_Creacion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    Creado_Por: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Usuarios,
            key: 'Id_Usuario',
        },
    },
    ListaJson: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '{"item_auditar": "", "conforme": false}',
    },
}, {
    tableName: 'Listas_Verificacion',
    timestamps: false,
});

ListasVerificacion.belongsTo(Usuarios, {
    foreignKey: 'Creado_Por',
    as: 'Creador',
});

module.exports = ListasVerificacion;