const { Sequelize } = require('sequelize');
const config = require('../config/db');

// Configuración de Sequelize usando variables (.ENV) importadas desde config.js
const sequelize = new Sequelize(config.DB.DATABASE, config.DB.USER, config.DB.PASSWORD, {
  host: config.DB.SERVER,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true, // Habilita SSL si es requerido por Clever Cloud
      rejectUnauthorized: false // Permite conexiones SSL sin validar el certificado (opcional)
    }
  },
  logging: false
});

// Prueba la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con Sequelize.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
})();

module.exports = sequelize;
