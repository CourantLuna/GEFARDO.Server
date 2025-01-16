const Sanciones = require('../models/Sanciones');
const Farmacias = require('../models/Farmacia'); // Asegúrate de que este modelo esté configurado correctamente

/// Obtener todas las sanciones
exports.getAllSanciones = async (req, res) => {
    try {
        const sanciones = await Sanciones.findAll({
            include: [
                { model: Farmacias, as: 'Farmacia' }, // Alias definido en la relación
            ],
        });
        res.status(200).json(sanciones);
    } catch (error) {
        console.error('Error al obtener las sanciones:', error);
        res.status(500).json({
            message: 'Error al obtener las sanciones',
            error: error.message,
        });
    }
};

// Obtener una sanción por ID
exports.getSancionById = async (req, res) => {
    try {
        const { id } = req.params;
        const sancion = await Sanciones.findByPk(id, {
            include: [
                { model: Farmacias, as: 'Farmacia' },
            ],
        });
        if (!sancion) {
            return res.status(404).json({ message: 'Sanción no encontrada' });
        }
        res.status(200).json(sancion);
    } catch (error) {
        console.error('Error al obtener la sanción:', error);
        res.status(500).json({
            message: 'Error al obtener la sanción',
            error: error.message,
        });
    }
};

// Crear una nueva sanción
exports.createSancion = async (req, res) => {
    try {
        const { ID_Farmacia, Fecha_Sancion, Detalle, Multa, Estado_Sancion } = req.body;
        const nuevaSancion = await Sanciones.create({
            ID_Farmacia,
            Fecha_Sancion,
            Detalle,
            Multa,
            Estado_Sancion,
        });
        res.status(201).json(nuevaSancion);
    } catch (error) {
        console.error('Error al crear la sanción:', error);
        res.status(500).json({
            message: 'Error al crear la sanción',
            error: error.message,
        });
    }
};

// Actualizar una sanción
exports.updateSancionById = async (req, res) => {
    try {
        const { id } = req.params;
        const { ID_Farmacia, Fecha_Sancion, Detalle, Multa, Estado_Sancion } = req.body;
        const sancion = await Sanciones.findByPk(id);
        if (!sancion) {
            return res.status(404).json({ message: 'Sanción no encontrada' });
        }
        sancion.ID_Farmacia = ID_Farmacia;
        sancion.Fecha_Sancion = Fecha_Sancion;
        sancion.Detalle = Detalle;
        sancion.Multa = Multa;
        sancion.Estado_Sancion = Estado_Sancion;
        await sancion.save();
        res.status(200).json(sancion);
    } catch (error) {
        console.error('Error al actualizar la sanción:', error);
        res.status(500).json({
            message: 'Error al actualizar la sanción',
            error: error.message,
        });
    }
};

// Eliminar una sanción
exports.deleteSancionById = async (req, res) => {
    try {
        const { id } = req.params;
        const sancion = await Sanciones.findByPk(id);
        if (!sancion) {
            return res.status(404).json({ message: 'Sanción no encontrada' });
        }
        await sancion.destroy();
        res.status(200).json({ message: 'Sanción eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la sanción:', error);
        res.status(500).json({
            message: 'Error al eliminar la sanción',
            error: error.message,
        });
    }
};