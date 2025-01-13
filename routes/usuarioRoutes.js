const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

// Rutas para usuarios
router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.addUsuario);
router.patch('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
