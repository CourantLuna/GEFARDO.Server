// Rutas: clasificacionRiesgoRoutes.js
const express = require('express');
const router = express.Router();
const {
    getAllClasificaciones,
    getClasificacionById,
    createClasificacion,
    updateClasificacionById,
    deleteClasificacionById
} = require('../controllers/clasificacionRiesgoController'); // Ajusta la ruta si es necesario

// Rutas para Clasificación de Riesgo

// Obtener todas las clasificaciones
router.get('/', getAllClasificaciones);

// Obtener una clasificación por ID
router.get('/:id', getClasificacionById);

// Crear una nueva clasificación
router.post('/', createClasificacion);

// Actualizar una clasificación por ID
router.put('/:id', updateClasificacionById);

// Eliminar una clasificación por ID
router.delete('/:id', deleteClasificacionById);

module.exports = router;
