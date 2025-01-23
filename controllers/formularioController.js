const Formulario = require('../models/Formulario');
const Usuario = require('../models/Usuario'); // Importa el modelo de Usuario si no está ya importado

// Obtener todos los formularios
exports.getAllFormularios = async (req, res) => {
  try {
    const formularios = await Formulario.findAll({
      include: [
        {
          model: Usuario,
          as: 'Creador',
          attributes: ['Nombre', 'Apellido'], // Solo traemos Nombre y Apellido
        },
        {
          model: Usuario,
          as: 'Modificador',
          attributes: ['Nombre', 'Apellido'], // Solo traemos Nombre y Apellido
        },
      ],
    });

    // Formatear el resultado para incluir los nombres completos
    const result = formularios.map((form) => {
      const formData = form.toJSON();
      return {
        ...formData,
        Nombre_Completo_Creador: formData.Creador
          ? `${formData.Creador.Nombre} ${formData.Creador.Apellido}`
          : null,
        Nombre_Completo_Modificador: formData.Modificador
          ? `${formData.Modificador.Nombre} ${formData.Modificador.Apellido}`
          : null,
      };
    });

    // Excluir las propiedades Creador y Modificador del resultado
    const cleanedResult = result.map(({ Creador, Modificador, ...rest }) => rest);

    res.json(cleanedResult);
  } catch (err) {
    console.error("Error al obtener formularios:", err);
    res.status(500).json({ error: 'Error al obtener los formularios' });
  }
};



// Obtener un formulario por ID
exports.getFormularioById = async (req, res) => {
  const { id } = req.params;

  try {
    const formulario = await Formulario.findByPk(id);
    if (!formulario) {
      return res.status(404).json({ message: 'Formulario no encontrado' });
    }
    res.json(formulario);
  } catch (err) {
    console.error("Error al obtener formulario:", err);
    res.status(500).json({ error: 'Error al obtener el formulario' });
  }
};

// Insertar un nuevo formulario
exports.addFormulario = async (req, res) => {
  try {
    const nuevoFormulario = await Formulario.create(req.body);
    res.status(201).json({ message: 'Formulario insertado con éxito', nuevoFormulario });
  } catch (err) {
    console.error("Error al insertar formulario:", err);
    res.status(500).json({ error: 'Error al insertar el formulario' });
  }
};

// Actualizar un formulario
exports.updateFormulario = async (req, res) => {
  const { id } = req.params;

  try {
    const formulario = await Formulario.findByPk(id);
    if (!formulario) {
      return res.status(404).json({ message: 'Formulario no encontrado' });
    }

    await formulario.update(req.body);
    res.json({ message: 'Formulario actualizado con éxito', formulario });
  } catch (err) {
    console.error("Error al actualizar formulario:", err);
    res.status(500).json({ error: 'Error al actualizar el formulario' });
  }
};

// Eliminar un formulario
exports.deleteFormulario = async (req, res) => {
  const { id } = req.params;

  try {
    const formulario = await Formulario.findByPk(id);
    if (!formulario) {
      return res.status(404).json({ message: 'Formulario no encontrado' });
    }

    await formulario.destroy();
    res.json({ message: 'Formulario eliminado con éxito' });
  } catch (err) {
    console.error("Error al eliminar formulario:", err);
    res.status(500).json({ error: 'Error al eliminar el formulario' });
  }
};
