const Inspeccion = require('../models/Inspeccion');

// Obtener todas las inspecciones
exports.getAllInspecciones = async (req, res) => {
  try {
    const inspecciones = await Inspeccion.findAll();
    res.json(inspecciones);
  } catch (err) {
    console.error("Error al obtener inspecciones:", err);
    res.status(500).json({ error: 'Error al obtener las inspecciones' });
  }
};

// Obtener una inspección por ID
exports.getInspeccionById = async (req, res) => {
  const { id } = req.params;

  try {
    const inspeccion = await Inspeccion.findByPk(id);
    if (!inspeccion) {
      return res.status(404).json({ message: 'Inspección no encontrada' });
    }
    res.json(inspeccion);
  } catch (err) {
    console.error("Error al obtener inspección:", err);
    res.status(500).json({ error: 'Error al obtener la inspección' });
  }
};

// Insertar una nueva inspección
exports.addInspeccion = async (req, res) => {
  try {
    const nuevaInspeccion = await Inspeccion.create(req.body);
    res.status(201).json({ message: 'Inspección insertada con éxito', nuevaInspeccion });
  } catch (err) {
    console.error("Error al insertar inspección:", err);
    res.status(500).json({ error: 'Error al insertar la inspección' });
  }
};

// Actualizar una inspección
exports.updateInspeccion = async (req, res) => {
  const { id } = req.params;

  try {
    const inspeccion = await Inspeccion.findByPk(id);
    if (!inspeccion) {
      return res.status(404).json({ message: 'Inspección no encontrada' });
    }

    await inspeccion.update(req.body);
    res.json({ message: 'Inspección actualizada con éxito', inspeccion });
  } catch (err) {
    console.error("Error al actualizar inspección:", err);
    res.status(500).json({ error: 'Error al actualizar la inspección' });
  }
};

// Eliminar una inspección
exports.deleteInspeccion = async (req, res) => {
  const { id } = req.params;

  try {
    const inspeccion = await Inspeccion.findByPk(id);
    if (!inspeccion) {
      return res.status(404).json({ message: 'Inspección no encontrada' });
    }

    await inspeccion.destroy();
    res.json({ message: 'Inspección eliminada con éxito' });
  } catch (err) {
    console.error("Error al eliminar inspección:", err);
    res.status(500).json({ error: 'Error al eliminar la inspección' });
  }
};
