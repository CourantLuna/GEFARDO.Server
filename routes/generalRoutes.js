const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');

// Endpoint para obtener un campo específico de una tabla
router.get('/:table', generalController.getFromTable);

module.exports = router;
