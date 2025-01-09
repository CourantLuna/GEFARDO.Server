const express = require('express');
const tipoServicioController = require('../controllers/tipoServicioController');

const router = express.Router();

// Rutas para tipos de servicio
router.get('/', tipoServicioController.getAllTiposServicio);
router.get('/:id', tipoServicioController.getTipoServicioById);
router.post('/', tipoServicioController.addTipoServicio);
router.put('/:id', tipoServicioController.updateTipoServicio);
router.delete('/:id', tipoServicioController.deleteTipoServicio);

module.exports = router;
