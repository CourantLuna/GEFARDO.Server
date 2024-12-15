const { connectToDatabase } = require('../config/db');
const sql = require('mssql');

// Obtener todas las provincias
exports.getAllProvinces = async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT * FROM Provincias');
    res.json(result.recordset);  // Devolver las provincias en formato JSON
  } catch (err) {
    console.error("Error al obtener provincias:", err);
    res.status(500).json({ error: 'Error al obtener las provincias' });
  }
};

// Insertar una nueva provincia
exports.addProvince = async (req, res) => {
  const { Descripcion, Estado } = req.body;

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('Descripcion', sql.VarChar, Descripcion)
      .input('Estado', sql.Bit, Estado || 1)  // Asignar 1 por defecto si no se pasa Estado
      .query('INSERT INTO Provincias (Descripcion, Estado) VALUES (@Descripcion, @Estado)');
    
    res.status(201).json({ message: 'Provincia creada exitosamente', id: result.recordset.insertId });
  } catch (error) {
    console.error('Error creando Provincia:', error);
    res.status(500).json({ message: 'Error creando datos', error: error.message });
  }
};

// Obtener una provincia por ID
exports.getProvinceById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Provincias WHERE Id_Provincia = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Provincia no encontrada' });
    }

    res.status(200).json(result.recordset[0]);  // Devolver la provincia encontrada
  } catch (error) {
    console.error('Error obteniendo la provincia:', error);
    res.status(500).json({ message: 'Error obteniendo los datos', error: error.message });
  }
};

// Actualizar una provincia
exports.updateProvinceById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { Descripcion, Estado } = req.body;

  try {
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('Descripcion', sql.VarChar, Descripcion)
      .input('Estado', sql.Bit, Estado || 1)  // Asignar 1 por defecto si no se pasa Estado
      .query('UPDATE Provincias SET Descripcion = @Descripcion, Estado = @Estado WHERE Id_Provincia = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Provincia no encontrada' });
    }

    res.status(200).json({ message: 'Provincia actualizada exitosamente' });
  } catch (error) {
    console.error('Error actualizando provincia:', error);
    res.status(500).json({ message: 'Error actualizando datos', error: error.message });
  }
};

// Eliminar una provincia
exports.deleteProvinceById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Provincias WHERE Id_Provincia = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Provincia no encontrada' });
    }

    res.status(200).json({ message: 'Provincia eliminada exitosamente' });
  } catch (error) {
    console.error('Error eliminando provincia:', error);
    res.status(500).json({ message: 'Error eliminando datos', error: error.message });
  }
};
