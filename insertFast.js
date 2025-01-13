const axios = require('axios');

// URL base del endpoint
const BASE_URL = 'http://localhost:3001/api/provincias'; // Cambia al endpoint real de tu API

// Datos de las provincias a insertar
const provinciasData = [
    { Id_Provincia: 1, Descripcion: 'Distrito Nacional', Estado: 1 },
    { Id_Provincia: 2, Descripcion: 'Santo Domingo', Estado: 1 },
    { Id_Provincia: 3, Descripcion: 'Santiago', Estado: 1 },
    { Id_Provincia: 4, Descripcion: 'San Cristóbal', Estado: 1 },
    { Id_Provincia: 5, Descripcion: 'La Vega', Estado: 1 },
    { Id_Provincia: 6, Descripcion: 'Puerto Plata', Estado: 1 },
    { Id_Provincia: 7, Descripcion: 'San Pedro de Macorís', Estado: 1 },
    { Id_Provincia: 8, Descripcion: 'Duarte', Estado: 1 },
    { Id_Provincia: 9, Descripcion: 'La Altagracia', Estado: 1 },
    { Id_Provincia: 10, Descripcion: 'La Romana', Estado: 1 },
    { Id_Provincia: 11, Descripcion: 'San Juan', Estado: 1 },
    { Id_Provincia: 12, Descripcion: 'Espaillat', Estado: 1 },
    { Id_Provincia: 13, Descripcion: 'Azua', Estado: 1 },
    { Id_Provincia: 14, Descripcion: 'Barahona', Estado: 1 },
    { Id_Provincia: 15, Descripcion: 'Monte Plata', Estado: 1 },
    { Id_Provincia: 16, Descripcion: 'Peravia', Estado: 1 },
    { Id_Provincia: 17, Descripcion: 'Monseñor Nouel', Estado: 1 },
    { Id_Provincia: 18, Descripcion: 'Valverde', Estado: 1 },
    { Id_Provincia: 19, Descripcion: 'Sánchez Ramírez', Estado: 1 },
    { Id_Provincia: 20, Descripcion: 'María Trinidad Sánchez', Estado: 1 },
    { Id_Provincia: 21, Descripcion: 'Montecristi', Estado: 1 },
    { Id_Provincia: 22, Descripcion: 'Samaná', Estado: 1 },
    { Id_Provincia: 23, Descripcion: 'Bahoruco', Estado: 1 },
    { Id_Provincia: 24, Descripcion: 'Hermanas Mirabal', Estado: 1 },
    { Id_Provincia: 25, Descripcion: 'El Seibo', Estado: 1 },
    { Id_Provincia: 26, Descripcion: 'Hato Mayor', Estado: 1 },
    { Id_Provincia: 27, Descripcion: 'Dajabón', Estado: 1 },
    { Id_Provincia: 28, Descripcion: 'Elías Piña', Estado: 1 },
    { Id_Provincia: 29, Descripcion: 'San José de Ocoa', Estado: 1 },
    { Id_Provincia: 30, Descripcion: 'Santiago Rodríguez', Estado: 1 },
    { Id_Provincia: 31, Descripcion: 'Independencia', Estado: 1 },
    { Id_Provincia: 32, Descripcion: 'Pedernales', Estado: 1 },
];

// Función para insertar las provincias
const insertProvincias = async () => {
    try {
        for (const provincia of provinciasData) {
            const response = await axios.post(BASE_URL, provincia);
            console.log(`Insertado: Provincia ${provincia.Descripcion} - Respuesta:`, response.data);
        }
        console.log('Todas las provincias se han insertado correctamente.');
    } catch (error) {
        console.error('Error al insertar las provincias:', error.response?.data || error.message);
    }
};

// Ejecutar la función
insertProvincias();
