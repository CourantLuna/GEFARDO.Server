const express = require('express');
const {
    getAllUsuarioRoles,
    addUsuarioRol,
    getUsuarioRolById,
    updateUsuarioRol,
    deleteUsuarioRol,
    getRolesByUsuarioId, // Nuevo método
} = require('../controllers/usuarioRolesController');

const router = express.Router();

// Rutas
router.get('/', getAllUsuarioRoles); // Obtener todos los UsuarioRoles
router.post('/', addUsuarioRol); // Crear un nuevo UsuarioRol
router.get('/:idUsuario/:idRol', getUsuarioRolById); // Obtener UsuarioRol por ID compuesto
router.put('/:idUsuario/:idRol', updateUsuarioRol); // Actualizar UsuarioRol
router.delete('/:idUsuario/:idRol', deleteUsuarioRol); // Eliminar UsuarioRol
router.get('/usuario/:idUsuario', getRolesByUsuarioId); // Obtener todos los roles de un usuario

module.exports = router;
