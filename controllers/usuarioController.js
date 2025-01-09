const Usuario = require('../models/Usuario');

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    console.error("Error al obtener usuario:", err);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Insertar un nuevo usuario
exports.addUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json({ message: 'Usuario insertado con éxito', nuevoUsuario });
  } catch (err) {
    console.error("Error al insertar usuario:", err);
    res.status(500).json({ error: 'Error al insertar el usuario' });
  }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await usuario.update(req.body);
    res.json({ message: 'Usuario actualizado con éxito', usuario });
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await usuario.destroy();
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
