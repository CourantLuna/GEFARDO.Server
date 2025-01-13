const jwt = require('jsonwebtoken');
const config = require('../config/db');

const SECRET_KEY = config.JWT_SECRET;

exports.generateToken = (payload) => {
    console.log('Generando token con clave:', SECRET_KEY);

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};


exports.verifyToken = (token) => {
    try {
        console.log('Verificando token con clave:', SECRET_KEY);
    console.log('Token recibido:', token);
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw new Error('Token inválido o expirado');
    }
};
