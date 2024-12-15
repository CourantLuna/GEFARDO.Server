const { connectToDatabase } = require('../config/db');
const sql = require('mssql');

// Obtener todos los roles
exports.getAllRoles = async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT * FROM Roles');
    res.json(result.recordset);  // Devolver los roles en formato JSON
  } catch (err) {
    console.error("Error al obtener roles:", err);
    res.status(500).json({ error: 'Error al obtener los roles' });
  }
};

// Obtener un rol por id
exports.getRolById = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Roles WHERE Rol_Id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    res.json(result.recordset[0]);  // Devolver el rol encontrado
  } catch (err) {
    console.error("Error al obtener rol:", err);
    res.status(500).json({ error: 'Error al obtener el rol' });
  }
};

// Insertar un nuevo rol
exports.addRol = async (req, res) => {
  const { Nombre_Rol, Nivel } = req.body;

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('Nombre_Rol', sql.VarChar, Nombre_Rol)
      .input('Nivel', sql.Char(1), Nivel)  // Nivel como CHAR(1) (A, M, B)
      .query('INSERT INTO Roles (Nombre_Rol, Nivel) VALUES (@Nombre_Rol, @Nivel)');

    res.status(201).json({ message: 'Rol insertado con éxito', result: result.rowsAffected });
  } catch (err) {
    console.error("Error al insertar rol:", err);
    res.status(500).json({ error: 'Error al insertar el rol' });
  }
};

// Actualizar un rol
exports.updateRol = async (req, res) => {
  const { id } = req.params;
  const { Nombre_Rol, Nivel } = req.body;

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('Nombre_Rol', sql.VarChar, Nombre_Rol)
      .input('Nivel', sql.Char(1), Nivel)
      .query('UPDATE Roles SET Nombre_Rol = @Nombre_Rol, Nivel = @Nivel WHERE Rol_Id = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    res.status(200).json({ message: 'Rol actualizado con éxito' });
  } catch (err) {
    console.error("Error al actualizar rol:", err);
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
};

// Eliminar un rol
exports.deleteRol = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Roles WHERE Rol_Id = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    res.json({ message: 'Rol eliminado con éxito' });
  } catch (err) {
    console.error("Error al eliminar rol:", err);
    res.status(500).json({ error: 'Error al eliminar el rol' });
  }
};
