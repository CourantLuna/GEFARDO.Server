const express = require('express');
const {
    getAllEstadosServicio,
    getEstadoServicioById,
    createEstadoServicio,
    updateEstadoServicioById,
    deleteEstadoServicioById,
} = require('../controllers/flujoEstadosServicioController'); // Ajusta la ruta si es necesario

const router = express.Router();

// Rutas CRUD
router.get('/', getAllEstadosServicio); // Obtener todos los estados
router.get('/:id', getEstadoServicioById); // Obtener un estado por ID
router.post('/', createEstadoServicio); // Crear un nuevo estado
router.put('/:id', updateEstadoServicioById); // Actualizar un estado
router.delete('/:id', deleteEstadoServicioById); // Eliminar un estado

module.exports = router;
