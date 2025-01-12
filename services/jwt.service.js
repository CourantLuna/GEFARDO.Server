const jwt = require('jsonwebtoken');
const config = require('../config/db');

const SECRET_KEY = config.JWT_SECRET;

exports.generateToken = (payload) => {
    console.log('GenerateToken: Generando token con clave:', SECRET_KEY);

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};


exports.verifyToken = (token) => {
    try {
    console.log('VerifyToken: Verificando token con clave:', SECRET_KEY);
    console.log('Token recibido:', token);
    return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new Error('Token expirado');
        } else if (err.name === 'JsonWebTokenError') {
            throw new Error('Token inválido');
        } else {
            throw new Error('Error al verificar el token');
        }
    }
};
