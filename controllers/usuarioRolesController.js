const { Roles, UsuarioRoles } = require('../models');
const { sequelize } = require('../config/sequelize');
const Usuarios = require('../models/Usuario'); // Modelo Usuarios


// Obtener todos los roles de usuario
exports.getAllUsuarioRoles = async (req, res) => {
    try {
        const usuarioRoles = await UsuarioRoles.findAll();
        res.status(200).json(usuarioRoles);
    } catch (error) {
        console.error('Error al obtener UsuarioRoles:', error);
        res.status(500).json({ error: 'Error al obtener los roles de usuario' });
    }
};

// Obtener todos los usuarios pertenecientes a un rol

exports.getAllUsersByRolId = async (req, res) => {
    try {
        const { rol } = req.params;
        if (!rol) {
            return res.status(400).json({ error: 'El parámetro "rol" es obligatorio.' });
        }

        // Consulta con relaciones
        const usuariosRoles = await UsuarioRoles.findAll({
            where: { Id_Rol: rol },
            include: [
                {
                    model: Usuarios,
                    attributes: ['Nombre', 'Apellido'], // Traer solo Nombre y Apellido
                },
                {
                    model: Roles,
                    attributes: ['Nombre_Rol'], // Traer solo Nombre_Rol
                },
            ],
            attributes: ['Id_Usuario', 'Id_Rol'], // Atributos de UsuarioRoles
        });

        // Formatear resultados para agregar Nombre_Completo
        const resultado = usuariosRoles.map((ur) => ({
            Id_Usuario: ur.Id_Usuario,
            Id_Rol: ur.Id_Rol,
            Nombre_Completo: `${ur.Usuario.Nombre} ${ur.Usuario.Apellido}`,
            Nombre_Rol: ur.Rol.Nombre_Rol,
        }));

        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al obtener los usuarios por rol:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud.' });
    }
};

// Crear un nuevo rol de usuario
exports.addUsuarioRol = async (req, res) => {
    try {
        const nuevoUsuarioRol = await UsuarioRoles.create(req.body);
        res.status(201).json(nuevoUsuarioRol);
    } catch (error) {
        console.error('Error al crear UsuarioRol:', error);
        res.status(500).json({ error: 'Error al crear el rol de usuario' });
    }
};

// Obtener un rol de usuario por ID
exports.getUsuarioRolById = async (req, res) => {
    try {
        const { idUsuario, idRol } = req.params;
        const usuarioRol = await UsuarioRoles.findOne({
            where: {
                Id_Usuario: idUsuario,
                Id_Rol: idRol,
            },
        });

        if (!usuarioRol) {
            return res.status(404).json({ message: 'UsuarioRol no encontrado' });
        }

        res.status(200).json(usuarioRol);
    } catch (error) {
        console.error('Error al obtener UsuarioRol:', error);
        res.status(500).json({ error: 'Error al obtener el rol de usuario' });
    }
};

// Eliminar un rol de usuario
exports.deleteUsuarioRol = async (req, res) => {
    try {
        const { idUsuario, idRol } = req.params;
        const usuarioRol = await UsuarioRoles.findOne({
            where: {
                Id_Usuario: idUsuario,
                Id_Rol: idRol,
            },
        });

        if (!usuarioRol) {
            return res.status(404).json({ message: 'UsuarioRol no encontrado' });
        }

        await usuarioRol.destroy();
        res.status(200).json({ message: 'UsuarioRol eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar UsuarioRol:', error);
        res.status(500).json({ error: 'Error al eliminar el rol de usuario' });
    }
};


// Obtener todos los roles de un usuario específico
exports.getRolesByUsuarioId = async (req, res) => {
    try {
        const { idUsuario } = req.params;

        const roles = await UsuarioRoles.findAll({
            where: { Id_Usuario: idUsuario },
            include: [
                {
                    model: Roles, // Asegúrate de que este modelo está correctamente configurado
                    attributes: ['Id_Rol', 'Nombre_Rol'], // Campos a incluir de Roles
                },
            ],
        });

        if (!roles || roles.length === 0) {
            return res.status(404).json({ message: 'UsuarioRol no encontrado' });
        }

        res.status(200).json(roles);
    } catch (error) {
        console.error('Error al obtener los roles del usuario:', error);
        res.status(500).json({ error: 'Error al obtener los roles del usuario' });
    }
};


