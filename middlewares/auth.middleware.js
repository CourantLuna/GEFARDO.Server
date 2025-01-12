const { verifyToken } = require('../services/jwt.service');

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token requerido para acceder a esta ruta' });
    }

    try {
        const decoded = verifyToken(token); // Llama a verifyToken correctamente
        req.user = decoded; // Agrega el usuario al request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};