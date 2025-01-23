const db = require('../models'); // Importa todos los modelos
const { Op } = require('sequelize'); // Importa operadores para consultas

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
        return res.status(404).json({ message: `La tabla '${table}' no existe.` });
      }

      // Construye los atributos dinámicamente
      const attributes = fields ? fields.split(',') : undefined; // Convierte "id,Nombre" en ["id", "Nombre"]

      // Consulta con Sequelize
      const results = await db[table].findAll({ attributes });

      // Devuelve los resultados
      res.json(results);
    } catch (error) {
      console.error(`Error al obtener datos de la tabla '${table}':`, error.message);
      res.status(500).json({ message: `No se pudo obtener datos de la tabla '${table}'.` });
    }
  },

  /**
   * Filtra datos dinámicamente según el modelo, campo y valor proporcionados
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   */
  filterByField: async (req, res) => {
    const { table } = req.params; // Nombre del modelo desde el parámetro
    const { field, value } = req.query; // Campo y valor desde la query string

    try {
      // Verifica si se pasaron los parámetros requeridos
      if (!table || !field || !value) {
        return res.status(400).json({
          message: "Los parámetros 'table', 'field' y 'value' son obligatorios."
        });
      }

      // Verifica si el modelo existe en db
      if (!db[table]) {
        return res.status(404).json({ message: `El modelo '${table}' no existe.` });
      }

      // Construcción dinámica del filtro
      const condition = {
        [field]: { [Op.eq]: value }, // Filtra por igualdad
      };

      // Consulta el modelo con la condición
      const results = await db[table].findAll({ where: condition });

      // Devuelve los resultados
      res.json(results);
    } catch (error) {
      console.error(`Error al filtrar datos en la tabla '${table}':`, error.message);
      res.status(500).json({
        message: `Error al filtrar datos en la tabla '${table}'.`,
        error: error.message
      });
    }
  }
};

module.exports = generalController;
