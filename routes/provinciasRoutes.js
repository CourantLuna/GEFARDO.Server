const express = require('express');
const {getAllProvinces,addProvince,getProvinceById, updateProvinceById,deleteProvinceById} = require('../controllers/provinciaController');
const router = express.Router();

router.get('/', getAllProvinces); // Obtener todas las provincias
router.post('/', addProvince); // Insertar una nueva provincia
router.get('/:id', getProvinceById); // Obtener un ingrediente por ID
router.put('/:id', updateProvinceById); // Actualizar un ingrediente
router.delete('/:id', deleteProvinceById); // Eliminar un ingrediente

module.exports = router;
