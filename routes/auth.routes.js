const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Ruta de autenticación no protegida
router.get('/secure', (req, res) => {
    res.status(200).json({ message: 'Bienvenido!' });
});

module.exports = router;
