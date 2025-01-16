const express = require('express');
const router = express.Router();
const {
    getAllAcciones,
    getAccionById,
    createAccion,
    updateAccionById,
    deleteAccionById
} = require('../controllers/accionesSeguimientoController'); // Asegúrate de ajustar la ruta

// Rutas para Acciones de Seguimiento

// Obtener todas las acciones de seguimiento
router.get('/', getAllAcciones);

// Obtener una acción de seguimiento por ID
router.get('/:id', getAccionById);

// Crear una nueva acción de seguimiento
router.post('/', createAccion);

// Actualizar una acción de seguimiento por ID
router.put('/:id', updateAccionById);

// Eliminar una acción de seguimiento por ID
router.delete('/:id', deleteAccionById);

module.exports = router;
