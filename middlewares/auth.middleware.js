const { verifyToken } = require('../services/jwt.service');

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Agregar datos del usuario al request
        next();
    } catch (err) {
        return res.status(403).json({ message: err.message });
    }
};
