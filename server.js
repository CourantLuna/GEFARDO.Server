const config = require('./config/db.js');
const express = require('express');
const cors = require('cors');
const generalRoutes = require('./routes/generalRoutes');


// Importar middleware
const { authMiddleware } = require('./middlewares/auth.middleware');

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const publicRoutes = require('./routes/public.routes'); // Agrupación de rutas públicas
const protectedRoutes = require('./routes/protected.routes'); // Agrupación de rutas protegidas

const app = express();

// Configurar CORS para permitir el frontend
app.use(cors({
  origin: 'http://localhost:3000', // URL del frontend
  credentials: true, // Permite enviar cookies o encabezados de autenticación
}));

// Middleware para parsear JSON
app.use(express.json());

console.log(`Starting server in ${config.NODE_ENV} mode...`);

// **RUTAS PÚBLICAS**
// Estas rutas no requieren autenticación
app.use('/auth', authRoutes);
app.use('/public', publicRoutes);

// Registrar rutas con el prefijo correspondiente

// **RUTAS PROTEGIDAS**
// Estas rutas requieren autenticación
app.use('/api', authMiddleware, protectedRoutes);
app.use('/general', generalRoutes);


// Ruta de prueba para verificar que todo funciona
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Inicia el servidor Express
app.listen(config.PORT, config.HOST, () => {
  console.log(`Server running at http://${config.HOST}:${config.PORT}`);
});
