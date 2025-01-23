const Inspeccion = require('../models/Inspeccion');
const Farmacia = require('../models/Farmacia');
const Usuario = require('../models/Usuario');// Obtener todas las inspecciones
// Obtener todas las inspecciones con el nombre de la farmacia e inspector
exports.getAllInspecciones = async (req, res) => {
  try {
    const inspecciones = await Inspeccion.findAll({
      include: [
        {
          model: Farmacia,
          as: 'Farmacia',
          attributes: ['Nombre'] // Solo traer el nombre de la farmacia
        },
        {
          model: Usuario,
          as: 'InspectorUsuario',
          attributes: ['Nombre', 'Apellido'] // Traer nombre y apellido del inspector
        }
      ]
    });

    // Formatear los resultados para omitir los objetos internos
    const formattedInspecciones = inspecciones.map((inspeccion) => ({
      Id_Inspeccion: inspeccion.Id_Inspeccion,
      Id_Farmacia: inspeccion.Id_Farmacia,
      Inspector: inspeccion.Inspector,
      Fecha_Programada_Inspeccion: inspeccion.Fecha_Programada_Inspeccion,
      Fecha_Completada_Inspeccion: inspeccion.Fecha_Completada_Inspeccion,
      Tipo_Actividad: inspeccion.Tipo_Actividad,
      Resultado: inspeccion.Resultado,
      Firma_Responsable: inspeccion.Firma_Responsable,
      Lista_Verificacion: inspeccion.Lista_Verificacion,
      Estado: inspeccion.Estado,
      Nombre_Farmacia: inspeccion.Farmacia?.Nombre || 'Desconocido',
      Nombre_Inspector: inspeccion.InspectorUsuario
        ? `${inspeccion.InspectorUsuario.Nombre} ${inspeccion.InspectorUsuario.Apellido}`
        : 'Desconocido'
    }));

    res.json(formattedInspecciones);
  } catch (err) {
    console.error('Error al obtener inspecciones:', err);
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
