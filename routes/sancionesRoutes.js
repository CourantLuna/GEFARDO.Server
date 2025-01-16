const express = require('express');
const {
    getAllSanciones,
    getSancionById,
    createSancion,
    updateSancionById,
    deleteSancionById,
} = require('../controllers/sancionesController');

const router = express.Router();

// Rutas CRUD
router.get('/', getAllSanciones); // Obtener todas las sanciones
router.get('/:id', getSancionById); // Obtener una sanción por ID
router.post('/', createSancion); // Crear una nueva sanción
router.put('/:id', updateSancionById); // Actualizar una sanción
router.delete('/:id', deleteSancionById); // Eliminar una sanción

module.exports = router;
