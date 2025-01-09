const Sancion = require('../models/Sancion');

// Obtener todas las sanciones
exports.getAllSanciones = async (req, res) => {
  try {
    const sanciones = await Sancion.findAll();
    res.json(sanciones);
  } catch (err) {
    console.error("Error al obtener sanciones:", err);
    res.status(500).json({ error: 'Error al obtener las sanciones' });
  }
};

// Obtener una sanción por ID
exports.getSancionById = async (req, res) => {
  const { id } = req.params;

  try {
    const sancion = await Sancion.findByPk(id);
    if (!sancion) {
      return res.status(404).json({ message: 'Sanción no encontrada' });
    }
    res.json(sancion);
  } catch (err) {
    console.error("Error al obtener sanción:", err);
    res.status(500).json({ error: 'Error al obtener la sanción' });
  }
};

// Insertar una nueva sanción
exports.addSancion = async (req, res) => {
  try {
    const nuevaSancion = await Sancion.create(req.body);
    res.status(201).json({ message: 'Sanción insertada con éxito', nuevaSancion });
  } catch (err) {
    console.error("Error al insertar sanción:", err);
    res.status(500).json({ error: 'Error al insertar la sanción' });
  }
};

// Actualizar una sanción
exports.updateSancion = async (req, res) => {
  const { id } = req.params;

  try {
    const sancion = await Sancion.findByPk(id);
    if (!sancion) {
      return res.status(404).json({ message: 'Sanción no encontrada' });
    }

    await sancion.update(req.body);
    res.json({ message: 'Sanción actualizada con éxito', sancion });
  } catch (err) {
    console.error("Error al actualizar sanción:", err);
    res.status(500).json({ error: 'Error al actualizar la sanción' });
  }
};

// Eliminar una sanción
exports.deleteSancion = async (req, res) => {
  const { id } = req.params;

  try {
    const sancion = await Sancion.findByPk(id);
    if (!sancion) {
      return res.status(404).json({ message: 'Sanción no encontrada' });
    }

    await sancion.destroy();
    res.json({ message: 'Sanción eliminada con éxito' });
  } catch (err) {
    console.error("Error al eliminar sanción:", err);
    res.status(500).json({ error: 'Error al eliminar la sanción' });
  }
};
