const express = require('express');
const farmaciaController = require('../controllers/farmaciaController');

const router = express.Router();

// Rutas para farmacias
router.get('/', farmaciaController.getAllFarmacias);
router.get('/:id', farmaciaController.getFarmaciaById);
router.post('/', farmaciaController.addFarmacia);
router.put('/:id', farmaciaController.updateFarmacia);
router.delete('/:id', farmaciaController.deleteFarmacia);

module.exports = router;
