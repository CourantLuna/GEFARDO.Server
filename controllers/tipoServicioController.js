const TipoServicio = require('../models/TipoServicio');

// Obtener todos los tipos de servicio
exports.getAllTiposServicio = async (req, res) => {
  try {
    const tipos = await TipoServicio.findAll();
    res.json(tipos);
  } catch (err) {
    console.error("Error al obtener tipos de servicio:", err);
    res.status(500).json({ error: 'Error al obtener los tipos de servicio' });
  }
};

// Obtener un tipo de servicio por ID
exports.getTipoServicioById = async (req, res) => {
  const { id } = req.params;

  try {
    const tipo = await TipoServicio.findByPk(id);
    if (!tipo) {
      return res.status(404).json({ message: 'Tipo de servicio no encontrado' });
    }
    res.json(tipo);
  } catch (err) {
    console.error("Error al obtener tipo de servicio:", err);
    res.status(500).json({ error: 'Error al obtener el tipo de servicio' });
  }
};

// Insertar un nuevo tipo de servicio
exports.addTipoServicio = async (req, res) => {
  try {
    const nuevoTipo = await TipoServicio.create(req.body);
    res.status(201).json({ message: 'Tipo de servicio insertado con éxito', nuevoTipo });
  } catch (err) {
    console.error("Error al insertar tipo de servicio:", err);
    res.status(500).json({ error: 'Error al insertar el tipo de servicio' });
  }
};

// Actualizar un tipo de servicio
exports.updateTipoServicio = async (req, res) => {
  const { id } = req.params;

  try {
    const tipo = await TipoServicio.findByPk(id);
    if (!tipo) {
      return res.status(404).json({ message: 'Tipo de servicio no encontrado' });
    }

    await tipo.update(req.body);
    res.json({ message: 'Tipo de servicio actualizado con éxito', tipo });
  } catch (err) {
    console.error("Error al actualizar tipo de servicio:", err);
    res.status(500).json({ error: 'Error al actualizar el tipo de servicio' });
  }
};

// Eliminar un tipo de servicio
exports.deleteTipoServicio = async (req, res) => {
  const { id } = req.params;

  try {
    const tipo = await TipoServicio.findByPk(id);
    if (!tipo) {
      return res.status(404).json({ message: 'Tipo de servicio no encontrado' });
    }

    await tipo.destroy();
    res.json({ message: 'Tipo de servicio eliminado con éxito' });
  } catch (err) {
    console.error("Error al eliminar tipo de servicio:", err);
    res.status(500).json({ error: 'Error al eliminar el tipo de servicio' });
  }
};
