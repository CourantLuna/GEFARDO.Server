const HistorialCambio = require('../models/HistorialCambios');

// Obtener todos los cambios
exports.getAllHistorialCambios = async (req, res) => {
  try {
    const cambios = await HistorialCambio.findAll();
    res.json(cambios);
  } catch (err) {
    console.error("Error al obtener historial de cambios:", err);
    res.status(500).json({ error: 'Error al obtener el historial de cambios' });
  }
};

// Obtener un cambio por ID
exports.getHistorialCambioById = async (req, res) => {
  const { id } = req.params;

  try {
    const cambio = await HistorialCambio.findByPk(id);
    if (!cambio) {
      return res.status(404).json({ message: 'Cambio no encontrado' });
    }
    res.json(cambio);
  } catch (err) {
    console.error("Error al obtener el cambio:", err);
    res.status(500).json({ error: 'Error al obtener el cambio' });
  }
};

// Insertar un nuevo cambio
exports.addHistorialCambio = async (req, res) => {
  try {
    const nuevoCambio = await HistorialCambio.create(req.body);
    res.status(201).json({ message: 'Cambio registrado con éxito', nuevoCambio });
  } catch (err) {
    console.error("Error al registrar cambio:", err);
    res.status(500).json({ error: 'Error al registrar el cambio' });
  }
};

// Actualizar un cambio
exports.updateHistorialCambio = async (req, res) => {
  const { id } = req.params;

  try {
    const cambio = await HistorialCambio.findByPk(id);
    if (!cambio) {
      return res.status(404).json({ message: 'Cambio no encontrado' });
    }

    await cambio.update(req.body);
    res.json({ message: 'Cambio actualizado con éxito', cambio });
  } catch (err) {
    console.error("Error al actualizar cambio:", err);
    res.status(500).json({ error: 'Error al actualizar el cambio' });
  }
};

// Eliminar un cambio
exports.deleteHistorialCambio = async (req, res) => {
  const { id } = req.params;

  try {
    const cambio = await HistorialCambio.findByPk(id);
    if (!cambio) {
      return res.status(404).json({ message: 'Cambio no encontrado' });
    }

    await cambio.destroy();
    res.json({ message: 'Cambio eliminado con éxito' });
  } catch (err) {
    console.error("Error al eliminar cambio:", err);
    res.status(500).json({ error: 'Error al eliminar el cambio' });
  }
};
