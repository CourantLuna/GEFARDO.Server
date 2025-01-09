const express = require('express');
const servicioController = require('../controllers/servicioController');

const router = express.Router();

// Rutas para servicios
router.get('/', servicioController.getAllServicios);
router.get('/:id', servicioController.getServicioById);
router.post('/', servicioController.addServicio);
router.put('/:id', servicioController.updateServicio);
router.delete('/:id', servicioController.deleteServicio);

module.exports = router;
