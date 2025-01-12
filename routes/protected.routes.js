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

module.exports = router;
