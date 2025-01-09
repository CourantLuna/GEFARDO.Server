const TipoFarmacia = require('../models/TipoFarmacia');

// Obtener todos los tipos de farmacia
exports.getAllTiposFarmacia = async (req, res) => {
  try {
    const tipos = await TipoFarmacia.findAll();
    res.json(tipos);
  } catch (err) {
    console.error("Error al obtener tipos de farmacia:", err);
    res.status(500).json({ error: 'Error al obtener los tipos de farmacia' });
  }
};

// Obtener un tipo de farmacia por ID
exports.getTipoFarmaciaById = async (req, res) => {
  const { id } = req.params;

  try {
    const tipo = await TipoFarmacia.findByPk(id);
    if (!tipo) {
      return res.status(404).json({ message: 'Tipo de farmacia no encontrado' });
    }
    res.json(tipo);
  } catch (err) {
    console.error("Error al obtener tipo de farmacia:", err);
    res.status(500).json({ error: 'Error al obtener el tipo de farmacia' });
  }
};

// Insertar un nuevo tipo de farmacia
exports.addTipoFarmacia = async (req, res) => {
  try {
    const nuevoTipo = await TipoFarmacia.create(req.body);
    res.status(201).json({ message: 'Tipo de farmacia insertado con éxito', nuevoTipo });
  } catch (err) {
    console.error("Error al insertar tipo de farmacia:", err);
    res.status(500).json({ error: 'Error al insertar el tipo de farmacia' });
  }
};

// Actualizar un tipo de farmacia
exports.updateTipoFarmacia = async (req, res) => {
  const { id } = req.params;

  try {
    const tipo = await TipoFarmacia.findByPk(id);
    if (!tipo) {
      return res.status(404).json({ message: 'Tipo de farmacia no encontrado' });
    }

    await tipo.update(req.body);
    res.json({ message: 'Tipo de farmacia actualizado con éxito', tipo });
  } catch (err) {
    console.error("Error al actualizar tipo de farmacia:", err);
    res.status(500).json({ error: 'Error al actualizar el tipo de farmacia' });
  }
};

// Eliminar un tipo de farmacia
exports.deleteTipoFarmacia = async (req, res) => {
  const { id } = req.params;

  try {
    const tipo = await TipoFarmacia.findByPk(id);
    if (!tipo) {
      return res.status(404).json({ message: 'Tipo de farmacia no encontrado' });
    }

    await tipo.destroy();
    res.json({ message: 'Tipo de farmacia eliminado con éxito' });
  } catch (err) {
    console.error("Error al eliminar tipo de farmacia:", err);
    res.status(500).json({ error: 'Error al eliminar el tipo de farmacia' });
  }
};
