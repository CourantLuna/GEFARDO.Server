const express = require('express');
const licenciaController = require('../controllers/licenciaController');

const router = express.Router();

// Rutas para licencias
router.get('/', licenciaController.getAllLicencias);
router.get('/:id', licenciaController.getLicenciaById);
router.post('/', licenciaController.addLicencia);
router.put('/:id', licenciaController.updateLicencia);
router.delete('/:id', licenciaController.deleteLicencia);

module.exports = router;
