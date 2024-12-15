const dotenv = require('dotenv');
const path = require('path');
const sql = require('mssql');


// Carga el archivo .env basado en NODE_ENV
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV || 'development'}.env`)
});

// Verifica la ruta del archivo .env
console.log(`Cargando variables desde: ${path.resolve(__dirname, process.env.NODE_ENV + '.env')}`);

// Imprimir las variables de entorno cargadas
console.log("Configuraciones cargadas:", {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_SERVER: process.env.DB_SERVER,
  DB_DATABASE: process.env.DB_DATABASE,
  // DB_DOMAIN: process.env.DB_DOMAIN,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD
});

// Configuraciones exportadas
const dbConfig = {
  host: process.env.HOST,
  env: process.env.NODE_ENV,
  port : process.env.PORT,
  DB: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
      encrypt: true, // Usar true si está en Azure
      trustServerCertificate: true, // Usar true para desarrollo local
    }
  }
};

async function connectToDatabase() {
  try {
    const pool = await sql.connect(dbConfig.DB);
    console.log('Conexión exitosa a SQL Server');
    return pool;
  } catch (err) {
    console.error('Error al conectar a SQL Server:', err);
  }
}

module.exports = {
  dbConfig,
  connectToDatabase
};