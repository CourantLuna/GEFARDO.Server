const express = require('express');
const historialCambioController = require('../controllers/historialCambiosController');

const router = express.Router();

// Rutas para historial de cambios
router.get('/', historialCambioController.getAllHistorialCambios);
router.get('/:id', historialCambioController.getHistorialCambioById);
router.post('/', historialCambioController.addHistorialCambio);
router.put('/:id', historialCambioController.updateHistorialCambio);
router.delete('/:id', historialCambioController.deleteHistorialCambio);

module.exports = router;
