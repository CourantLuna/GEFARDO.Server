const express = require('express');
const {
    getAllUsuarioRoles,
    addUsuarioRol,
    getUsuarioRolById,
    deleteUsuarioRol,getAllUsersByRolId,
    getRolesByUsuarioId, // Nuevo método
} = require('../controllers/usuarioRolesController');

const router = express.Router();

// Rutas
// router.get('/:idUsuario/:idRol', getUsuarioRolById); // Obtener UsuarioRol por ID compuesto
router.get('/', getAllUsuarioRoles); // Obtener todos los UsuarioRoles
router.post('/', addUsuarioRol); // Crear un nuevo UsuarioRol
router.delete('/:idUsuario/:idRol', deleteUsuarioRol); // Eliminar UsuarioRol
router.get('/usuario/roles/:idUsuario', getRolesByUsuarioId); // Obtener todos los roles de un usuario
router.get('/:rol', getAllUsersByRolId); // Obtener UsuarioRol por ID compuesto



module.exports = router;
