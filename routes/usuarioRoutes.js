const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rutas para usuarios
router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.addUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);
router.post('/upload-profile-picture/:id', upload.single('foto'), usuarioController.uploadProfilePicture);

module.exports = router;
