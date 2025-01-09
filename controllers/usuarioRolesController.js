const UsuarioRoles = require('../models/UsuarioRoles');

// Obtener todos los registros de Usuario_Roles
exports.getAllUsuarioRoles = async (req, res) => {
  try {
    const usuarioRoles = await UsuarioRoles.findAll();
    res.json(usuarioRoles);
  } catch (err) {
    console.error("Error al obtener registros Usuario_Roles:", err);
    res.status(500).json({ error: 'Error al obtener los registros Usuario_Roles' });
  }
};

// Obtener un registro de Usuario_Roles por ID de usuario y rol
exports.getUsuarioRolesById = async (req, res) => {
  const { usuarioId, rolId } = req.params;

  try {
    const usuarioRol = await UsuarioRoles.findOne({
      where: {
        Id_Usuario: usuarioId,
        Id_Rol: rolId
      }
    });
    if (!usuarioRol) {
      return res.status(404).json({ message: 'Relación Usuario-Rol no encontrada' });
    }
    res.json(usuarioRol);
  } catch (err) {
    console.error("Error al obtener Usuario_Roles:", err);
    res.status(500).json({ error: 'Error al obtener la relación Usuario-Rol' });
  }
};

// Crear un nuevo registro en Usuario_Roles
exports.addUsuarioRoles = async (req, res) => {
  try {
    const nuevoUsuarioRol = await UsuarioRoles.create(req.body);
    res.status(201).json({ message: 'Relación Usuario-Rol creada con éxito', nuevoUsuarioRol });
  } catch (err) {
    console.error("Error al crear Usuario_Roles:", err);
    res.status(500).json({ error: 'Error al crear la relación Usuario-Rol' });
  }
};

// Eliminar un registro de Usuario_Roles por ID de usuario y rol
exports.deleteUsuarioRoles = async (req, res) => {
  const { usuarioId, rolId } = req.params;

  try {
    const usuarioRol = await UsuarioRoles.findOne({
      where: {
        Id_Usuario: usuarioId,
        Id_Rol: rolId
      }
    });
    if (!usuarioRol) {
      return res.status(404).json({ message: 'Relación Usuario-Rol no encontrada' });
    }

    await usuarioRol.destroy();
    res.json({ message: 'Relación Usuario-Rol eliminada con éxito' });
  } catch (err) {
    console.error("Error al eliminar Usuario_Roles:", err);
    res.status(500).json({ error: 'Error al eliminar la relación Usuario-Rol' });
  }
};
