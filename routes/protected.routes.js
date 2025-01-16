const express = require('express');


// Importar rutas protegidas
const provinciasRoutes = require('./provinciasRoutes');
const rolesRoutes = require('./rolesRoutes');
const farmaciaRoutes = require('./farmaciaRoutes');
const formularioRoutes = require('./formularioRoutes');
const historialCambioRoutes = require('./historialCambioRoutes');
const inspeccionRoutes = require('./inspeccionRoutes');
const licenciaRoutes = require('./licensiaRoutes');
const sancionRoutes = require('./sancionRoutes');
const servicioRoutes = require('./servicioRoutes');
const tipoFarmaciaRoutes = require('./tipoFarmaciaRoutes');
const tipoServicioRoutes = require('./tipoServicioRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const usuarioRolesRoutes = require('./usuarioRolesRoutes');

const listasVerificacionRoutes = require('./listasVerificacionRoutes');
const flujoEstadosServicioRoutes = require('./flujoEstadosServiciosRoutes.js'); // Ajusta la ruta según la ubicación

const sancionesRoutes = require('./sancionesRoutes');
const accionesSeguimientoRoutes = require('./accionesSeguimientoRoutes');
const clasificacionRiesgoRoutes = require('./ClasificacionRiesgoRoutes');
const hallazgosRoutes = require('./hallazgosRoutes');



const router = express.Router();

// Agregar rutas protegidas
router.use('/provincias', provinciasRoutes);
router.use('/roles', rolesRoutes);
router.use('/farmacias', farmaciaRoutes);
router.use('/formularios', formularioRoutes);
router.use('/historial-cambios', historialCambioRoutes);
router.use('/inspecciones', inspeccionRoutes);
router.use('/licencias', licenciaRoutes);
router.use('/sanciones', sancionRoutes);
router.use('/servicios', servicioRoutes);
router.use('/tipos-farmacia', tipoFarmaciaRoutes);
router.use('/tipos-servicio', tipoServicioRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/usuarioRoles', usuarioRolesRoutes);
router.use('/acciones-seguimiento', accionesSeguimientoRoutes);
router.use('/clasificaciones-riesgo', clasificacionRiesgoRoutes);
router.use('/listas-verificacion', listasVerificacionRoutes);
router.use('/flujo-estados-servicio', flujoEstadosServicioRoutes);
router.use('/hallazgos', hallazgosRoutes);

module.exports = router;
