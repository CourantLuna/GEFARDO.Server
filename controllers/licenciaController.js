const Licencia = require('../models/Licencia');

// Obtener todas las licencias
exports.getAllLicencias = async (req, res) => {
  try {
    const licencias = await Licencia.findAll({
      include: {
        model: require('../models/Farmacia'), // Relación con Farmacia
        as: 'Farmacia', // Alias definido en el modelo Licencia
        attributes: ['Nombre'], // Solo incluye el campo 'Nombre' de Farmacia
      },
    });

    // Mapear los datos para agregar 'Nombre_Farmacia' y eliminar la clave 'Farmacia'
    const licenciasConNombreFarmacia = licencias.map((licencia) => {
      const licenciaData = licencia.toJSON();
      return {
        ...licenciaData,
        Nombre_Farmacia: licenciaData.Farmacia?.Nombre || null, // Extraer el nombre de la farmacia
      };
    }).map(({ Farmacia, ...rest }) => rest); // Eliminar la clave 'Farmacia'

    res.json(licenciasConNombreFarmacia);
  } catch (err) {
    console.error("Error al obtener licencias:", err);
    res.status(500).json({ error: 'Error al obtener las licencias' });
  }
};



// Obtener una licencia por ID
exports.getLicenciaById = async (req, res) => {
  const { id } = req.params;

  try {
    const licencia = await Licencia.findByPk(id);
    if (!licencia) {
      return res.status(404).json({ message: 'Licencia no encontrada' });
    }
    res.json(licencia);
  } catch (err) {
    console.error("Error al obtener licencia:", err);
    res.status(500).json({ error: 'Error al obtener la licencia' });
  }
};

// Insertar una nueva licencia
exports.addLicencia = async (req, res) => {
  try {
    const nuevaLicencia = await Licencia.create(req.body);
    res.status(201).json({ message: 'Licencia insertada con éxito', nuevaLicencia });
  } catch (err) {
    console.error("Error al insertar licencia:", err);
    res.status(500).json({ error: 'Error al insertar la licencia' });
  }
};

// Actualizar una licencia
exports.updateLicencia = async (req, res) => {
  const { id } = req.params;

  try {
    const licencia = await Licencia.findByPk(id);
    if (!licencia) {
      return res.status(404).json({ message: 'Licencia no encontrada' });
    }

    await licencia.update(req.body);
    res.json({ message: 'Licencia actualizada con éxito', licencia });
  } catch (err) {
    console.error("Error al actualizar licencia:", err);
    res.status(500).json({ error: 'Error al actualizar la licencia' });
  }
};

// Eliminar una licencia
exports.deleteLicencia = async (req, res) => {
  const { id } = req.params;

  try {
    const licencia = await Licencia.findByPk(id);
    if (!licencia) {
      return res.status(404).json({ message: 'Licencia no encontrada' });
    }

    await licencia.destroy();
    res.json({ message: 'Licencia eliminada con éxito' });
  } catch (err) {
    console.error("Error al eliminar licencia:", err);
    res.status(500).json({ error: 'Error al eliminar la licencia' });
  }
};
