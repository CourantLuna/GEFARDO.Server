const Usuario = require('../models/Usuario');
const Roles = require('../models/Rol');
const UsuarioRoles = require('../models/UsuarioRoles');
const { generateToken } = require('../services/jwt.service');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { Correo_Electronico, Clave, Nombre } = req.body;

        // Encriptar la contraseña con bcrypt
        const hashedPassword = await bcrypt.hash(Clave, 10);

        const usuario = await Usuario.create({
            Correo_Electronico,
            Clave: hashedPassword,
            Nombre
        });

        res.status(201).json({ message: 'Usuario registrado con éxito', usuario });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.login = async (req, res) => {
    try {
        const { Correo_Electronico, Clave } = req.body;

        // Buscar usuario por correo
        const usuario = await Usuario.findOne({ where: { Correo_Electronico } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña con el hash almacenado
        const isPasswordValid = await bcrypt.compare(Clave, usuario.Clave);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Obtener roles del usuario
        const roles = await UsuarioRoles.findAll({
            where: { Id_Usuario: usuario.Id_Usuario },
            include: [
                {
                    model: Roles,
                    attributes: ['Nombre_Rol'], // Solo obtener los nombres de los roles
                },
            ],
        });

        if (!roles || roles.length === 0) {
            return res.status(404).json({ message: 'Roles no encontrados para el usuario' });
        }

        // Extraer solo los nombres de los roles
        const roleNames = roles.map((role) => role.Rol.Nombre_Rol);

        // Generar token JWT
        const token = generateToken({
            id: usuario.Id_Usuario,
            name: usuario.Nombre,
            email: usuario.Correo_Electronico,
            roles: roleNames // Los nombres de los roles
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
