const sequelize = require('../config/sequelize');
const Roles = require('./Rol');
const UsuarioRoles = require('./UsuarioRoles');

// Configurar relaciones
UsuarioRoles.belongsTo(Roles, { foreignKey: 'Id_Rol' });
Roles.hasMany(UsuarioRoles, { foreignKey: 'Id_Rol' });

module.exports = {
    sequelize,
    Roles,
    UsuarioRoles,
};
