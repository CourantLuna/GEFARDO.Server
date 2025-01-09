const express = require('express');
const tipoFarmaciaController = require('../controllers/tipoFarmaciaController');

const router = express.Router();

// Rutas para tipos de farmacia
router.get('/', tipoFarmaciaController.getAllTiposFarmacia);
router.get('/:id', tipoFarmaciaController.getTipoFarmaciaById);
router.post('/', tipoFarmaciaController.addTipoFarmacia);
router.put('/:id', tipoFarmaciaController.updateTipoFarmacia);
router.delete('/:id', tipoFarmaciaController.deleteTipoFarmacia);

module.exports = router;
