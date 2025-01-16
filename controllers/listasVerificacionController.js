// Controlador: listasVerificacionController.js
const ListasVerificacion = require('../models/listasVerificacion');
const Usuarios = require('../models/Usuario');

// Obtener todas las listas de verificación
exports.getAllListas = async (req, res) => {
    try {
        const listas = await ListasVerificacion.findAll({
            include: [{ model: Usuarios, as: 'Creador' }],
        });
        res.status(200).json(listas);
    } catch (error) {
        console.error('Error al obtener las listas de verificación:', error);
        res.status(500).json({ message: 'Error al obtener las listas de verificación', error: error.message });
    }
};

// Obtener una lista de verificación por su ID
exports.getListaById = async (req, res) => {
    try {
        const { id } = req.params;
        const lista = await ListasVerificacion.findByPk(id, {
            include: [{ model: Usuarios, as: 'Creador' }],
        });

        if (!lista) {
            return res.status(404).json({ message: 'Lista de verificación no encontrada' });
        }

        res.status(200).json(lista);
    } catch (error) {
        console.error('Error al obtener la lista de verificación:', error);
        res.status(500).json({ message: 'Error al obtener la lista de verificación', error: error.message });
    }
};

// Crear una nueva lista de verificación
exports.createLista = async (req, res) => {
    try {
        const nuevaLista = await ListasVerificacion.create(req.body);
        res.status(201).json({ message: 'Lista de verificación creada con éxito', lista: nuevaLista });
    } catch (error) {
        console.error('Error al crear la lista de verificación:', error);
        res.status(500).json({ message: 'Error al crear la lista de verificación', error: error.message });
    }
};

// Actualizar una lista de verificación por su ID
exports.updateListaById = async (req, res) => {
    try {
        const { id } = req.params;
        const lista = await ListasVerificacion.findByPk(id);

        if (!lista) {
            return res.status(404).json({ message: 'Lista de verificación no encontrada' });
        }

        await lista.update(req.body);
        res.status(200).json({ message: 'Lista de verificación actualizada con éxito', lista });
    } catch (error) {
        console.error('Error al actualizar la lista de verificación:', error);
        res.status(500).json({ message: 'Error al actualizar la lista de verificación', error: error.message });
    }
};

// Eliminar una lista de verificación por su ID
exports.deleteListaById = async (req, res) => {
    try {
        const { id } = req.params;
        const lista = await ListasVerificacion.findByPk(id);

        if (!lista) {
            return res.status(404).json({ message: 'Lista de verificación no encontrada' });
        }

        await lista.destroy();
        res.status(200).json({ message: 'Lista de verificación eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la lista de verificación:', error);
        res.status(500).json({ message: 'Error al eliminar la lista de verificación', error: error.message });
    }
};
