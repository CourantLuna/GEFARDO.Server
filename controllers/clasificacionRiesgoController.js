// Controlador: clasificacionRiesgoController.js
const ClasificacionRiesgo = require('../models/clasificacionRiesgo');

// Obtener todas las clasificaciones de riesgo
exports.getAllClasificaciones = async (req, res) => {
    try {
        const clasificaciones = await ClasificacionRiesgo.findAll();
        res.status(200).json(clasificaciones);
    } catch (error) {
        console.error('Error al obtener las clasificaciones de riesgo:', error);
        res.status(500).json({ message: 'Error al obtener las clasificaciones de riesgo', error: error.message });
    }
};

// Obtener una clasificación de riesgo por su ID
exports.getClasificacionById = async (req, res) => {
    try {
        const { id } = req.params;
        const clasificacion = await ClasificacionRiesgo.findByPk(id);

        if (!clasificacion) {
            return res.status(404).json({ message: 'Clasificación de riesgo no encontrada' });
        }

        res.status(200).json(clasificacion);
    } catch (error) {
        console.error('Error al obtener la clasificación de riesgo:', error);
        res.status(500).json({ message: 'Error al obtener la clasificación de riesgo', error: error.message });
    }
};

// Crear una nueva clasificación de riesgo
exports.createClasificacion = async (req, res) => {
    try {
        const nuevaClasificacion = await ClasificacionRiesgo.create(req.body);
        res.status(201).json({ message: 'Clasificación de riesgo creada con éxito', clasificacion: nuevaClasificacion });
    } catch (error) {
        console.error('Error al crear la clasificación de riesgo:', error);
        res.status(500).json({ message: 'Error al crear la clasificación de riesgo', error: error.message });
    }
};

// Actualizar una clasificación de riesgo por su ID
exports.updateClasificacionById = async (req, res) => {
    try {
        const { id } = req.params;
        const clasificacion = await ClasificacionRiesgo.findByPk(id);

        if (!clasificacion) {
            return res.status(404).json({ message: 'Clasificación de riesgo no encontrada' });
        }

        await clasificacion.update(req.body);
        res.status(200).json({ message: 'Clasificación de riesgo actualizada con éxito', clasificacion });
    } catch (error) {
        console.error('Error al actualizar la clasificación de riesgo:', error);
        res.status(500).json({ message: 'Error al actualizar la clasificación de riesgo', error: error.message });
    }
};

// Eliminar una clasificación de riesgo por su ID
exports.deleteClasificacionById = async (req, res) => {
    try {
        const { id } = req.params;
        const clasificacion = await ClasificacionRiesgo.findByPk(id);

        if (!clasificacion) {
            return res.status(404).json({ message: 'Clasificación de riesgo no encontrada' });
        }

        await clasificacion.destroy();
        res.status(200).json({ message: 'Clasificación de riesgo eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la clasificación de riesgo:', error);
        res.status(500).json({ message: 'Error al eliminar la clasificación de riesgo', error: error.message });
    }
};
