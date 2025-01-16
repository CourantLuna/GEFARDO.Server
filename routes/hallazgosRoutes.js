const express = require('express');
const {
    getAllHallazgos,
    getHallazgoById,
    createHallazgo,
    updateHallazgoById,
    deleteHallazgoById,
} = require('../controllers/hallazgosController');

const router = express.Router();

// Rutas CRUD
router.get('/', getAllHallazgos); // Obtener todos los hallazgos
router.get('/:id', getHallazgoById); // Obtener un hallazgo por ID
router.post('/', createHallazgo); // Crear un nuevo hallazgo
router.put('/:id', updateHallazgoById); // Actualizar un hallazgo
router.delete('/:id', deleteHallazgoById); // Eliminar un hallazgo

module.exports = router;
