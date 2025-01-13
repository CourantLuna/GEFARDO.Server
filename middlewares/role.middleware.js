exports.requireRole = (role) => {
    return (req, res, next) => {
        const userRoles = req.user.roles; // Obtener los roles del usuario desde el token

        if (!userRoles.includes(role)) {
            return res.status(403).json({ message: `Acceso denegado: Se requiere el rol ${role}.` });
        }

        next(); // El usuario tiene el rol requerido, continuar
    };
};
