// Rutas: listasVerificacionRoutes.js
const express = require('express');
const router = express.Router();
const {
    getAllListas,
    getListaById,
    createLista,
    updateListaById,
    deleteListaById,
} = require('../controllers/listasVerificacionController'); // Asegúrate de ajustar la ruta según tu estructura

// Rutas para Listas de Verificación

// Obtener todas las listas
router.get('/', getAllListas);

// Obtener una lista por ID
router.get('/:id', getListaById);

// Crear una nueva lista
router.post('/', createLista);

// Actualizar una lista por ID
router.put('/:id', updateListaById);

// Eliminar una lista por ID
router.delete('/:id', deleteListaById);

module.exports = router;
