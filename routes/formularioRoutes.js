const express = require('express');
const formularioController = require('../controllers/formularioController');

const router = express.Router();

// Rutas para formularios
router.get('/', formularioController.getAllFormularios);
router.get('/:id', formularioController.getFormularioById);
router.post('/', formularioController.addFormulario);
router.put('/:id', formularioController.updateFormulario);
router.delete('/:id', formularioController.deleteFormulario);

module.exports = router;
