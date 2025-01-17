const sequelize = require('../config/sequelize');
const Roles = require('./Rol');
const UsuarioRoles = require('./UsuarioRoles');
const Usuarios = require('./Usuario')
const AccionesSeguimiento = require('./AccionesSeguimiento')
const ClasificacionRiesgo = require('./ClasificacionRiesgo')
const Farmacia = require('./Farmacia')
const FlujoEstadosServicio = require('./FlujoEstadosServicio');
const Formulario = require('./Formulario');
const Hallazgos = require('./Hallazgo');
const HistorialCambio = require('./HistorialCambios');
const Inspeccion = require('./Inspeccion');
const Licencia = require('./Licencia');
const ListasVerificacion = require('./listasVerificacion');
const Provincia = require('./Provincia');
const Sancion = require('./Sancion');
const Servicio = require('./Servicio');
const TipoFarmacia = require('./TipoFarmacia');
const TipoServicio = require('./TipoServicio');



// Configurar relaciones
UsuarioRoles.belongsTo(Roles, { foreignKey: 'Id_Rol' });
Roles.hasMany(UsuarioRoles, { foreignKey: 'Id_Rol' });

// Mapeo de IdName para cada modelo
const modelIdNames = {
    Roles: 'Id_Rol',
    UsuarioRoles: 'Id_UsuarioRoles',
    Usuarios: 'Id_Usuario',
    AccionesSeguimiento: 'Id_AccionSeguimiento',
    ClasificacionRiesgo: 'Id_ClasificacionRiesgo',
    Farmacia: 'Id_Farmacia',
    FlujoEstadosServicio: 'Id_FlujoEstadoServicio',
    Formulario: 'Id_Formulario',
    Hallazgos: 'Id_Hallazgo',
    HistorialCambio: 'Id_HistorialCambio',
    Inspeccion: 'Id_Inspeccion',
    Licencia: 'Id_Licencia',
    ListasVerificacion: 'Id_ListaVerificacion',
    Provincia: 'Id_Provincia',
    Sancion: 'Id_Sancion',
    Servicio: 'Id_Servicio',
    TipoFarmacia: 'Id_TipoFarmacia',
    TipoServicio: 'Id_TipoServicio',
};

module.exports = {
    sequelize,
    Roles,
    UsuarioRoles,
    Usuarios,
    AccionesSeguimiento,
    ClasificacionRiesgo,
    Farmacia,
    FlujoEstadosServicio,
    Formulario,
    Hallazgos,
    HistorialCambio,
    Inspeccion,
    Licencia,
    ListasVerificacion,
    Provincia,
    Sancion,
    Servicio,
    TipoFarmacia,
    TipoServicio
};
