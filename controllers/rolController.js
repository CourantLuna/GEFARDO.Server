const Rol = require('../models/Rol');

// Obtener todos los roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);  // Devolver los roles en formato JSON
  } catch (err) {
    console.error("Error al obtener roles:", err);
    res.status(500).json({ error: 'Error al obtener los roles' });
  }
};

// Obtener un rol por id
exports.getRolById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const rol = await Rol.findByPk(id);  // Buscar rol por ID
    if (!rol) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.json(rol);  // Devolver el rol encontrado
  } catch (err) {
    console.error("Error al obtener rol:", err);
    res.status(500).json({ error: 'Error al obtener el rol' });
  }
};

// Insertar un nuevo rol
exports.addRol = async (req, res) => {

  try {
    const nuevoRol = await Rol.create(req.body);
    res.status(201).json({ message: 'Rol insertado con éxito', nuevoRol });
  } catch (err) {
    console.error("Error al insertar rol:", err);
    res.status(500).json({ error: 'Error al insertar el rol' });
  }
};

// Actualizar un rol
exports.updateRol = async (req, res) => {


  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const rol = await Rol.findByPk(id);
    if (!rol) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    await rol.update(req.body);
    res.status(200).json(rol);
    res.json({ message: 'Rol actualizado con éxito', rol });
  } catch (err) {
    console.error("Error al actualizar rol:", err);
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
};

// Eliminar un rol
exports.deleteRol = async (req, res) => {
  const { id } = req.params;

  try {
    const rol = await Rol.findByPk(id);
    if (!rol) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    await rol.destroy();  // Eliminar el rol

    res.json({ message: 'Rol eliminado con éxito' });
  } catch (err) {
    console.error("Error al eliminar rol:", err);
    res.status(500).json({ error: 'Error al eliminar el rol' });
  }
};

