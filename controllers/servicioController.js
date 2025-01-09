const Servicio = require('../models/Servicio');

// Obtener todos los servicios
exports.getAllServicios = async (req, res) => {
  try {
    const servicios = await Servicio.findAll();
    res.json(servicios);
  } catch (err) {
    console.error("Error al obtener servicios:", err);
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
};

// Obtener un servicio por ID
exports.getServicioById = async (req, res) => {
  const { id } = req.params;

  try {
    const servicio = await Servicio.findByPk(id);
    if (!servicio) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json(servicio);
  } catch (err) {
    console.error("Error al obtener servicio:", err);
    res.status(500).json({ error: 'Error al obtener el servicio' });
  }
};

// Insertar un nuevo servicio
exports.addServicio = async (req, res) => {
  try {
    const nuevoServicio = await Servicio.create(req.body);
    res.status(201).json({ message: 'Servicio insertado con éxito', nuevoServicio });
  } catch (err) {
    console.error("Error al insertar servicio:", err);
    res.status(500).json({ error: 'Error al insertar el servicio' });
  }
};

// Actualizar un servicio
exports.updateServicio = async (req, res) => {
  const { id } = req.params;

  try {
    const servicio = await Servicio.findByPk(id);
    if (!servicio) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    await servicio.update(req.body);
    res.json({ message: 'Servicio actualizado con éxito', servicio });
  } catch (err) {
    console.error("Error al actualizar servicio:", err);
    res.status(500).json({ error: 'Error al actualizar el servicio' });
  }
};

// Eliminar un servicio
exports.deleteServicio = async (req, res) => {
  const { id } = req.params;

  try {
    const servicio = await Servicio.findByPk(id);
    if (!servicio) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    await servicio.destroy();
    res.json({ message: 'Servicio eliminado con éxito' });
  } catch (err) {
    console.error("Error al eliminar servicio:", err);
    res.status(500).json({ error: 'Error al eliminar el servicio' });
  }
};
