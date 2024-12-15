const config = require('./config/db.js');
const express = require('express');
const provinciasRoutes = require('./routes/provinciasRoutes');
const rolesRoutes = require('./routes/rolesRoutes');

const app = express();

// Middleware para parsear JSON
app.use(express.json());


console.log(`Starting server in ${config.dbConfig.env} mode...`);
// Conexión a la base de datos
config.connectToDatabase();

// Rutas
app.use('/api/provincias', provinciasRoutes);
app.use('/api/roles', rolesRoutes);


// Ruta de prueba para verificar que todo funciona
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});


// Inicia el servidor Express
app.listen(config.dbConfig.port, config.dbConfig.host, () => {
  console.log(`Server running at http://${config.dbConfig.host}:${config.dbConfig.port}`);
});