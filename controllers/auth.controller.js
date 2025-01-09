const Usuario = require('../models/Usuario');
const { generateToken } = require('../services/jwt.service');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { Correo_Electronico, Clave } = req.body;
        const hashedPassword = await bcrypt.hash(Clave, 10);

        const usuario = await Usuario.create({
            Correo_Electronico,
            Clave: hashedPassword,
        });

        res.status(201).json(usuario);
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.login = async (req, res) => {
    try {
        const { Correo_Electronico, Clave } = req.body;

        const usuario = await Usuario.findOne({ where: { Correo_Electronico } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(Clave, usuario.Clave);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = generateToken({ id: usuario.Usuario_Id });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
