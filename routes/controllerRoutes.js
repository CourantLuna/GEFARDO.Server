const express = require('express');
const router = express.Router();
const controller = require('../controllers/Controller');

// Rutas para CRUD
router.get('/:tableName', controller.getAllItems);
router.get('/:tableName/:id', controller.getItemById);
router.post('/:tableName', controller.addItem);
router.put('/:tableName/:id', controller.updateItem);
router.delete('/:tableName/:id', controller.deleteItem);

module.exports = router;
