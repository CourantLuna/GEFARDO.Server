const express = require('express');
const router = express.Router();
const { getAllRoles, getRolById, addRol, updateRol, deleteRol} = require('../controllers/rolController');  // Importar el controlador

router.get('/', getAllRoles); // Obtener todos los roles
router.get('/:id', getRolById); // Obtener un rol por id
router.post('/', addRol); // Insertar un nuevo rol
router.put('/:id', updateRol); // Actualizar un rol
router.delete('/:id', deleteRol); // Eliminar un rol


module.exports = router;
