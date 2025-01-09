const express = require('express');
const inspeccionController = require('../controllers/inspeccionController');

const router = express.Router();

// Rutas para inspecciones
router.get('/', inspeccionController.getAllInspecciones);
router.get('/:id', inspeccionController.getInspeccionById);
router.post('/', inspeccionController.addInspeccion);
router.put('/:id', inspeccionController.updateInspeccion);
router.delete('/:id', inspeccionController.deleteInspeccion);

module.exports = router;
