const AccionesSeguimiento = require('../models/AccionesSeguimiento');
const Inspecciones = require('../models/Inspeccion');
const Usuarios = require('../models/Usuario');

exports.getAllAcciones = async (req, res) => {
    try {
        const acciones = await AccionesSeguimiento.findAll({
            include: [
                { model: Inspecciones, as: 'Inspeccion' },
                { model: Usuarios, as: 'ResponsableUsuario' },
            ],
        });
        res.status(200).json(acciones);
    } catch (error) {
        console.error('Error al obtener las acciones de seguimiento:', error);
        res.status(500).json({ message: 'Error al obtener las acciones de seguimiento', error: error.message });
    }
};

// Obtener una acción de seguimiento por su ID
exports.getAccionById = async (req, res) => {
    try {
        const { id } = req.params;
        const accion = await AccionesSeguimiento.findByPk(id, {
            include: [
                { model: Inspecciones},
                { model: Usuarios }
            ]
        });

        if (!accion) {
            return res.status(404).json({ message: "Acción de seguimiento no encontrada" });
        }

        res.status(200).json(accion);
    } catch (error) {
        console.error("Error al obtener la acción de seguimiento:", error);
        res.status(500).json({ message: "Error al obtener la acción de seguimiento", error: error.message });
    }
};

// Crear una nueva acción de seguimiento
exports.createAccion = async (req, res) => {
    try {
        const nuevaAccion = await AccionesSeguimiento.create(req.body);
        res.status(201).json({ message: "Acción de seguimiento creada con éxito", accion: nuevaAccion });
    } catch (error) {
        console.error("Error al crear la acción de seguimiento:", error);
        res.status(500).json({ message: "Error al crear la acción de seguimiento", error: error.message });
    }
};

// Actualizar una acción de seguimiento por su ID
exports.updateAccionById = async (req, res) => {
    try {
        const { id } = req.params;
        const accion = await AccionesSeguimiento.findByPk(id);

        if (!accion) {
            return res.status(404).json({ message: "Acción de seguimiento no encontrada" });
        }

        await accion.update(req.body);
        res.status(200).json({ message: "Acción de seguimiento actualizada con éxito", accion });
    } catch (error) {
        console.error("Error al actualizar la acción de seguimiento:", error);
        res.status(500).json({ message: "Error al actualizar la acción de seguimiento", error: error.message });
    }
};

// Eliminar una acción de seguimiento por su ID
exports.deleteAccionById = async (req, res) => {
    try {
        const { id } = req.params;
        const accion = await AccionesSeguimiento.findByPk(id);

        if (!accion) {
            return res.status(404).json({ message: "Acción de seguimiento no encontrada" });
        }

        await accion.destroy();
        res.status(200).json({ message: "Acción de seguimiento eliminada con éxito" });
    } catch (error) {
        console.error("Error al eliminar la acción de seguimiento:", error);
        res.status(500).json({ message: "Error al eliminar la acción de seguimiento", error: error.message });
    }
};
