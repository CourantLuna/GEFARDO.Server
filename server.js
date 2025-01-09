const config = require('./config/db.js');
const express = require('express');

// Importar rutas
const provinciasRoutes = require('./routes/provinciasRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const farmaciaRoutes = require('./routes/farmaciaRoutes');
const formularioRoutes = require('./routes/formularioRoutes');
const historialCambioRoutes = require('./routes/historialCambioRoutes');
const inspeccionRoutes = require('./routes/inspeccionRoutes');
const licenciaRoutes = require('./routes/licensiaRoutes');
const sancionRoutes = require('./routes/sancionRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
const tipoFarmaciaRoutes = require('./routes/tipoFarmaciaRoutes');
const tipoServicioRoutes = require('./routes/tipoServicioRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const usuarioRolesRoutes = require('./routes/usuarioRolesRoutes');


const app = express();

// Middleware para parsear JSON
app.use(express.json());

console.log(`Starting server in ${config.NODE_ENV} mode...`);

// Rutas
app.use('/api/provincias', provinciasRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/farmacias', farmaciaRoutes);
app.use('/api/formularios', formularioRoutes);
app.use('/api/historial-cambios', historialCambioRoutes);
app.use('/api/inspecciones', inspeccionRoutes);
app.use('/api/licencias', licenciaRoutes);
app.use('/api/sanciones', sancionRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/tipos-farmacia', tipoFarmaciaRoutes);
app.use('/api/tipos-servicio', tipoServicioRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/usuarioRoles', usuarioRolesRoutes);


// Ruta de prueba para verificar que todo funciona
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Inicia el servidor Express
app.listen(config.PORT, config.HOST, () => {
  console.log(`Server running at http://${config.HOST}:${config.PORT}`);
});
