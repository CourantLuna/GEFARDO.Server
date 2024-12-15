const { connectToDatabase } = require('../config/db');
const sql = require('mssql');

// Mapeo de tablas y su columna de ID correspondiente
const idColumnMapping = {
  'roles': 'Id_Rol',
  'provincias': 'Id_Provincia',
  'usuarios': 'Id_Usuario',
  // Puedes agregar más mapeos aquí según las tablas
};

// Obtener todos los registros de la tabla
exports.getAllItems = async (req, res) => {
  const tableName = req.params.tableName;

  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query(`SELECT * FROM ${tableName}`);
    res.json(result.recordset);  // Devolver todos los registros en formato JSON
  } catch (err) {
    console.error(`Error al obtener los registros de ${tableName}:`, err);
    res.status(500).json({ error: `Error al obtener los registros de ${tableName}` });
  }
};

// Obtener un registro por ID (usando el mapeo de columna ID)
exports.getItemById = async (req, res) => {
  const tableName = req.params.tableName;
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  // Verifica si la tabla existe en el mapeo
  const idColumn = idColumnMapping[tableName];

  if (!idColumn) {
    return res.status(400).json({ message: `Columna de ID no definida para la tabla ${tableName}` });
  }

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`SELECT * FROM ${tableName} WHERE ${idColumn} = @id`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: `${tableName} no encontrado` });
    }

    res.json(result.recordset[0]);  // Devolver el registro encontrado
  } catch (err) {
    console.error(`Error al obtener ${tableName} por ${idColumn}:`, err);
    res.status(500).json({ error: `Error al obtener ${tableName} por ${idColumn}` });
  }
};

// Insertar un nuevo registro
exports.addItem = async (req, res) => {
  const tableName = req.params.tableName;
  const { ...data } = req.body;

  try {
    const pool = await connectToDatabase();
    const result = await pool.request();

    // Asegúrate de pasar todos los parámetros del body correctamente
    Object.keys(data).forEach((key) => {
      result.input(key, sql.VarChar, data[key]); // Definir el tipo de datos dependiendo del campo
    });

    // Construcción de la consulta de inserción
    const query = `INSERT INTO ${tableName} (${Object.keys(data).join(', ')}) 
                   VALUES (${Object.keys(data).map(key => '@' + key).join(', ')})`;
    console.log(query);
    // Ejecutar la consulta
    await result.query(query);
    res.status(201).json({ message: `${tableName} creado con éxito` });
  } catch (err) {
    console.error(`Error al crear ${tableName}:`, err);
    res.status(500).json({ error: `Error al crear ${tableName}` });
  }
};


// Actualizar un registro
exports.updateItem = async (req, res) => {
  const tableName = req.params.tableName;
  const id = parseInt(req.params.id, 10);
  const { ...data } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const pool = await connectToDatabase();
    const result = await pool.request().input('id', sql.Int, id);

    // Asegúrate de pasar todos los parámetros del body correctamente
    Object.keys(data).forEach((key) => {
      result.input(key, sql.VarChar, data[key]); // Definir el tipo de datos dependiendo del campo
    });

    const query = `UPDATE ${tableName} SET 
      ${Object.keys(data).map((key) => `${key} = @${key}`).join(', ')}
      WHERE ${idColumnMapping[tableName]} = @id`;

    const updateResult = await result.query(query);
    if (updateResult.rowsAffected[0] === 0) {
      return res.status(404).json({ message: `${tableName} no encontrado` });
    }

    res.status(200).json({ message: `${tableName} actualizado con éxito` });
  } catch (err) {
    console.error(`Error al actualizar ${tableName}:`, err);
    res.status(500).json({ error: `Error al actualizar ${tableName}` });
  }
};

// Eliminar un registro
exports.deleteItem = async (req, res) => {
  const tableName = req.params.tableName;
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const pool = await connectToDatabase();
    const result = await pool.request().input('id', sql.Int, id)
      .query(`DELETE FROM ${tableName} WHERE ${idColumnMapping[tableName]} = @id`);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: `${tableName} no encontrado` });
    }

    res.status(200).json({ message: `${tableName} eliminado con éxito` });
  } catch (err) {
    console.error(`Error al eliminar ${tableName}:`, err);
    res.status(500).json({ error: `Error al eliminar ${tableName}` });
  }
};
