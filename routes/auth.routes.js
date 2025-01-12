const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');

const router = express.Router();

// Ruta pública para login
router.post('/login', login);

// Ruta protegida para registro (solo administradores)
router.post('/register', authMiddleware, requireRole('Administrador'), register);

// Ruta de autenticación no protegida
router.get('/secure', (req, res) => {
    res.status(200).json({ message: 'Bienvenido!' });
});

module.exports = router;
