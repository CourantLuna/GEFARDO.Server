const express = require('express');
const generalController = require('../controllers/generalController');

const router = express.Router();

// Ruta para obtener datos de cualquier tabla
router.get('/:table', generalController.getFromTable);

// Ruta para filtrar datos dinámicamente
router.get('/filter/:table', generalController.filterByField);

module.exports = router;
