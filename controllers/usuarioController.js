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

    const fotoBase64 = usuario.Foto_Perfil
      ? `data:image/jpeg;base64,${usuario.Foto_Perfil.toString('base64')}`
      : null;

    const usuarioConFoto = {
      ...usuario.toJSON(),
      Foto_Perfil: fotoBase64,
    };

    res.json(usuarioConFoto);
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

    // Actualizar solo las propiedades enviadas
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

//Subir foto de perfil de un usuario

exports.uploadProfilePicture = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const fotoBuffer = req.file.buffer;
    await usuario.update({ Foto_Perfil: fotoBuffer });

    res.status(200).json({ message: 'Foto de perfil subida con éxito' });
  } catch (err) {
    console.error('Error al subir la foto de perfil:', err);
    res.status(500).json({ error: 'Error al subir la foto de perfil' });
  }
};
