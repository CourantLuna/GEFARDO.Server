const db = require('../models'); // Asegúrate de importar tus modelos

const generalController = {
   /**
   * Obtiene datos de una tabla específica y campos específicos
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   */
   getFromTable: async (req, res) => {
    const { table } = req.params; // Nombre de la tabla
    const { fields } = req.query; // Campos a seleccionar (por ejemplo: "id,Nombre")

    try {
      // Verifica si la tabla existe en los modelos
      if (!db[table]) {
        return res.status(404).json({ message: `La tabla ${table} no existe.` });
      }

      // Construye los atributos dinámicamente
      const attributes = fields ? fields.split(',') : undefined; // Convierte "id,Nombre" en ["id", "Nombre"]

      // Consulta con Sequelize
      const results = await db[table].findAll({ attributes });

      // Devuelve los resultados
      res.json(results);
    } catch (error) {
      console.error(`Error al obtener datos de la tabla ${table}:`, error.message);
      res.status(500).json({ message: `No se pudo obtener datos de la tabla ${table}.` });
    }
  },
};

module.exports = generalController;
