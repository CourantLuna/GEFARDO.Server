const sequelize = require('../config/sequelize');
const Roles = require('./Rol');
const UsuarioRoles = require('./UsuarioRoles');
const AccionesSeguimiento = require('./AccionesSeguimiento');
const Inspecciones = require('./Inspeccion');
const Usuarios = require('./Usuario');

// Configurar relaciones
UsuarioRoles.belongsTo(Roles, { foreignKey: 'Id_Rol' });
Roles.hasMany(UsuarioRoles, { foreignKey: 'Id_Rol' });

AccionesSeguimiento.belongsTo(Inspecciones, { foreignKey: 'Id_Inspeccion' });
AccionesSeguimiento.belongsTo(Usuarios, { foreignKey: 'ResponsableUsuario'});

Inspecciones.hasMany(AccionesSeguimiento, { foreignKey: 'Id_Inspeccion' });
Usuarios.hasMany(AccionesSeguimiento, { foreignKey: 'ResponsableUsuario' });

module.exports = {
    sequelize,
    Roles,
    UsuarioRoles,
    AccionesSeguimiento,
    Inspecciones,
    Usuarios
};
