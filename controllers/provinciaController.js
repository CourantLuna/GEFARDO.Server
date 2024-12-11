const Provincia = require('../models/Provincia');

// Obtener todas las provincias
exports.getAllProvinces = async (req, res) => {
  try {
    const provincias = await Provincia.findAll();
    res.json(provincias);  // Devolver las provincias en formato JSON
  } catch (err) {
    console.error("Error al obtener provincias:", err);
    res.status(500).json({ error: 'Error al obtener las provincias' });
  }
};

// Insertar una nueva provincia
exports.addProvince = async (req, res) => {
  try {
    const nuevaProvincia = await Provincia.create(req.body);
    res.status(201).json(nuevaProvincia);
  } catch (error) {
    console.error('Error creando Provincia:', error);
    res.status(500).json({ message: 'Error creating data', error: error.message });
  }
};

// Obtener un provincia por ID
exports.getProvinceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const provincia = await Provincia.findByPk(id);
    if (!provincia) {
      return res.status(404).json({ message: 'Provincia not found' });
    }

    res.status(200).json(provincia);
  } catch (error) {
    console.error('Error obteniendo el provincia:', error);
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

// Actualizar un provincia
exports.updateProvinceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const provincia = await Provincia.findByPk(id);
    if (!provincia) {
      return res.status(404).json({ message: 'provincia not found' });
    }

    await provincia.update(req.body);
    res.status(200).json(provincia);
  } catch (error) {
    console.error('Error actualizando provincia:', error);
    res.status(500).json({ message: 'Error updating data', error: error.message });
  }
};

// Eliminar un provincia
exports.deleteProvinceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const provincia = await Provincia.findByPk(id);
    if (!provincia) {
      return res.status(404).json({ message: 'provincia not found' });
    }

    await provincia.destroy();
    res.status(200).json({ message: 'provincia deleted successfully' });
  } catch (error) {
    console.error('Error eliminando provincia:', error);
    res.status(500).json({ message: 'Error deleting data', error: error.message });
  }
};

