const Farmacia = require('../models/Farmacia');


// Obtener todas las farmacias
exports.getAllFarmacias = async (req, res) => {
  try {
    const Provincia = require('../models/Provincia'); // Importar el modelo de Provincia

const farmacias = await Farmacia.findAll({
  include: [
    {
      model: Provincia, // Modelo relacionado
      as: 'Provincia', // Alias definido en las asociaciones
      attributes: ['Descripcion'], // Solo traer el campo necesario
    },
  ],
});

const farmaciasConProvincias = farmacias.map((farmacia) => {
  const { Provincia, ...farmaciaData } = farmacia.toJSON(); // Extraer y omitir Provincia
  return {
    ...farmaciaData,
    Nombre_Provincia: Provincia ? Provincia.Descripcion : null,
  };
});

res.json(farmaciasConProvincias);

  } catch (err) {
    console.error("Error al obtener farmacias:", err);
    res.status(500).json({ error: 'Error al obtener las farmacias' });
  }
};

// Obtener una farmacia por ID
exports.getFarmaciaById = async (req, res) => {
  const { id } = req.params;

  try {
    const farmacia = await Farmacia.findByPk(id);
    if (!farmacia) {
      return res.status(404).json({ message: 'Farmacia no encontrada' });
    }
    res.json(farmacia);
  } catch (err) {
    console.error("Error al obtener farmacia:", err);
    res.status(500).json({ error: 'Error al obtener la farmacia' });
  }
};

// Insertar una nueva farmacia
exports.addFarmacia = async (req, res) => {
  try {
    const nuevaFarmacia = await Farmacia.create(req.body);
    res.status(201).json({ message: 'Farmacia insertada con éxito', nuevaFarmacia });
  } catch (err) {
    console.error("Error al insertar farmacia:", err);
    res.status(500).json({ error: 'Error al insertar la farmacia' });
  }
};

// Actualizar una farmacia
exports.updateFarmacia = async (req, res) => {
  const { id } = req.params;

  try {
    const farmacia = await Farmacia.findByPk(id);
    if (!farmacia) {
      return res.status(404).json({ message: 'Farmacia no encontrada' });
    }

    await farmacia.update(req.body);
    res.json({ message: 'Farmacia actualizada con éxito', farmacia });
  } catch (err) {
    console.error("Error al actualizar farmacia:", err);
    res.status(500).json({ error: 'Error al actualizar la farmacia' });
  }
};

// Eliminar una farmacia
exports.deleteFarmacia = async (req, res) => {
  const { id } = req.params;

  try {
    const farmacia = await Farmacia.findByPk(id);
    if (!farmacia) {
      return res.status(404).json({ message: 'Farmacia no encontrada' });
    }

    await farmacia.destroy();
    res.json({ message: 'Farmacia eliminada con éxito' });
  } catch (err) {
    console.error("Error al eliminar farmacia:", err);
    res.status(500).json({ error: 'Error al eliminar la farmacia' });
  }
};
