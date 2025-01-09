const express = require('express');
const sancionController = require('../controllers/sancionController');

const router = express.Router();

// Rutas para sanciones
router.get('/', sancionController.getAllSanciones);
router.get('/:id', sancionController.getSancionById);
router.post('/', sancionController.addSancion);
router.put('/:id', sancionController.updateSancion);
router.delete('/:id', sancionController.deleteSancion);

module.exports = router;
